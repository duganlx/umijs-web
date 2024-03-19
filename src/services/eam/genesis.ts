import { VectorLoader } from "apache-arrow/visitor/vectorloader";
import { FlightServicePromiseClient } from "./arrow/flight/Flight_grpc_web_pb";
import { Ticket } from "./arrow/flight/Flight_pb";
import {
  Table,
  type Schema,
  type Vector,
  Message,
  Data,
  makeData,
  Struct,
  RecordBatch,
} from "apache-arrow";

function createTicket(request: any) {
  const reqBuf = Buffer.from(JSON.stringify(request), "utf8");
  const ticket = new Ticket();
  ticket.setTicket(reqBuf.toString("base64"));
  return ticket;
}

function decodeRecordBatch(msg: Message, schema?: Schema) {
  if (!schema) {
    // todo maybe return error
    return;
  }
  if (!msg.isRecordBatch()) {
    return;
  }

  const header = msg.header();
  const dictionaries: Map<number, Vector> = new Map<number, any>();
  // 构建数据解析器 参考 arrow项目 visitor/vectorloader.ts 实现
  const children = new VectorLoader(
    msg.body,
    header.nodes,
    header.buffers,
    dictionaries
  ).visitMany(schema.fields) as Data[];

  const data = makeData({
    type: new Struct(schema.fields),
    length: header.length,
    // 重新构建数据， 使得数据的原型链与当前导入包一致，。
    children: children.map(
      (v) =>
        new Data(
          v.type,
          v.offset,
          v.length,
          v.nullCount,
          v.buffers,
          children,
          v.dictionary
        )
      // (v) => new Data(v.type, v.offset, v.length, v.nullCount, v, v.children, v.dictionary),
    ),
  });

  return new RecordBatch(schema, data);
}

function transferResponseJson(table: Table) {
  const rows = table.numRows;
  const ret: any[] = Array.from({ length: rows });
  const colMap = table.schema.fields.map((field, index) => {
    return {
      name: field.name,
      col: table.getChildAt(index),
    };
  });

  for (let i = 0; i < rows; i++) {
    const obj: any = {};
    colMap.forEach((col) => {
      obj[col.name] = col.col?.get(i);
    });
    ret[i] = obj;
  }

  return ret;
}

function transferResponseMapArray(table: Table) {
  const mapValues: any = {};
  table.schema.fields.forEach((field, index) => {
    const col = table.getChildAt(index);
    // todo 由于部分场景无法从vector中调用toArray方法。需使用数组遍历方式
    if (col) {
      try {
        mapValues[field.name] = col.toArray();
      } catch (error) {
        const arr: any[] = [];
        for (let i = 0; i < col.length; i++) {
          arr.push(col.get(i));
        }
        mapValues[field.name] = arr;
      }
    }
  });
  return mapValues;
}

function transferResponse(table: Table, format: "arrow" | "json" | "mapArray") {
  if (format === "arrow") {
    return table;
  }
  if (format === "json") {
    return transferResponseJson(table);
  }
  if (format === "mapArray") {
    return transferResponseMapArray(table);
  }
}

export async function GetData(req: Record<string, any>) {
  const format = "mapArray";
  const header = {
    "Content-Type": "application/grpc-web",
  };
  const ticket = createTicket(req);

  return new Promise((resolve, reject) => {
    let schema: Schema | undefined; // 用于保存schema
    const cli = new FlightServicePromiseClient("/eam/grpc_arrow", null, {
      withCredentials: false,
    });

    let hasData = false;
    let respData: any[] = [];
    try {
      cli
        .doGet(ticket, header)
        .on("data", (resp) => {
          const dataHeader = resp.getDataHeader();
          if (dataHeader && dataHeader.length > 0) {
            const dh = resp.getDataHeader_asU8();
            const msg = Message.decode(dh);

            if (msg.isSchema()) {
              schema = msg.header();
            } else if (msg.isRecordBatch()) {
              // bugger: 由于使用response.getDataBody_asU8(); 方式读取到的body 其 byteOffset 存在大于0情况。
              // 导致数据解析异常， 需要重置byteOffset为0,
              const dataBody = resp.getDataBody_asU8();
              msg.body = new Uint8Array(dataBody, 0);
              const batch = decodeRecordBatch(msg, schema);
              if (!!batch) {
                const table = new Table(batch);
                hasData = true;
                resolve(transferResponse(table, format));
                // const col = table.getChildAt(0);
                // console.log(col);
              } else {
                console.log("decodeRecordBatch error");
                reject("数据解析异常，请联系管理员");
              }
            }
            // todo 还剩一个isDictionaryBatch 待实现。等待具体场景
          }
        })
        .on("end", () => {
          // console.log('arrow doGet end');
          if (!hasData) {
            const table = new Table();
            resolve(transferResponse(table, format));
          }

          resolve(respData);
        })
        .on("metadata", (s) => {
          // console.log(s, "arrow doGet metadata");
        })
        .on("status", (s) => {
          console.log(s, "arrow doGet status");
        })
        .on("error", (err) => {
          console.log(req, err, "arrow doGet error, on error");
          reject(err);
        });
    } catch (err) {
      console.log(err, "arrow doGet error, catch");
      reject(err);
    }
  });
}
