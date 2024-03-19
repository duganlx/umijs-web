import * as jspb from 'google-protobuf';

export class HandshakeRequest extends jspb.Message {
  getProtocolVersion(): number;
  setProtocolVersion(value: number): HandshakeRequest;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): HandshakeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HandshakeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HandshakeRequest): HandshakeRequest.AsObject;
  static serializeBinaryToWriter(message: HandshakeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HandshakeRequest;
  static deserializeBinaryFromReader(
    message: HandshakeRequest,
    reader: jspb.BinaryReader,
  ): HandshakeRequest;
}

export namespace HandshakeRequest {
  export type AsObject = {
    protocolVersion: number;
    payload: Uint8Array | string;
  };
}

export class HandshakeResponse extends jspb.Message {
  getProtocolVersion(): number;
  setProtocolVersion(value: number): HandshakeResponse;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): HandshakeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HandshakeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HandshakeResponse): HandshakeResponse.AsObject;
  static serializeBinaryToWriter(message: HandshakeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HandshakeResponse;
  static deserializeBinaryFromReader(
    message: HandshakeResponse,
    reader: jspb.BinaryReader,
  ): HandshakeResponse;
}

export namespace HandshakeResponse {
  export type AsObject = {
    protocolVersion: number;
    payload: Uint8Array | string;
  };
}

export class BasicAuth extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): BasicAuth;

  getPassword(): string;
  setPassword(value: string): BasicAuth;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BasicAuth.AsObject;
  static toObject(includeInstance: boolean, msg: BasicAuth): BasicAuth.AsObject;
  static serializeBinaryToWriter(message: BasicAuth, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BasicAuth;
  static deserializeBinaryFromReader(message: BasicAuth, reader: jspb.BinaryReader): BasicAuth;
}

export namespace BasicAuth {
  export type AsObject = {
    username: string;
    password: string;
  };
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {};
}

export class ActionType extends jspb.Message {
  getType(): string;
  setType(value: string): ActionType;

  getDescription(): string;
  setDescription(value: string): ActionType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionType.AsObject;
  static toObject(includeInstance: boolean, msg: ActionType): ActionType.AsObject;
  static serializeBinaryToWriter(message: ActionType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionType;
  static deserializeBinaryFromReader(message: ActionType, reader: jspb.BinaryReader): ActionType;
}

export namespace ActionType {
  export type AsObject = {
    type: string;
    description: string;
  };
}

export class Criteria extends jspb.Message {
  getExpression(): Uint8Array | string;
  getExpression_asU8(): Uint8Array;
  getExpression_asB64(): string;
  setExpression(value: Uint8Array | string): Criteria;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Criteria.AsObject;
  static toObject(includeInstance: boolean, msg: Criteria): Criteria.AsObject;
  static serializeBinaryToWriter(message: Criteria, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Criteria;
  static deserializeBinaryFromReader(message: Criteria, reader: jspb.BinaryReader): Criteria;
}

export namespace Criteria {
  export type AsObject = {
    expression: Uint8Array | string;
  };
}

export class Action extends jspb.Message {
  getType(): string;
  setType(value: string): Action;

  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): Action;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Action.AsObject;
  static toObject(includeInstance: boolean, msg: Action): Action.AsObject;
  static serializeBinaryToWriter(message: Action, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Action;
  static deserializeBinaryFromReader(message: Action, reader: jspb.BinaryReader): Action;
}

export namespace Action {
  export type AsObject = {
    type: string;
    body: Uint8Array | string;
  };
}

export class Result extends jspb.Message {
  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): Result;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    body: Uint8Array | string;
  };
}

export class SchemaResult extends jspb.Message {
  getSchema(): Uint8Array | string;
  getSchema_asU8(): Uint8Array;
  getSchema_asB64(): string;
  setSchema(value: Uint8Array | string): SchemaResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaResult.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaResult): SchemaResult.AsObject;
  static serializeBinaryToWriter(message: SchemaResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaResult;
  static deserializeBinaryFromReader(
    message: SchemaResult,
    reader: jspb.BinaryReader,
  ): SchemaResult;
}

export namespace SchemaResult {
  export type AsObject = {
    schema: Uint8Array | string;
  };
}

export class FlightDescriptor extends jspb.Message {
  getType(): FlightDescriptor.DescriptorType;
  setType(value: FlightDescriptor.DescriptorType): FlightDescriptor;

  getCmd(): Uint8Array | string;
  getCmd_asU8(): Uint8Array;
  getCmd_asB64(): string;
  setCmd(value: Uint8Array | string): FlightDescriptor;

  getPathList(): string[];
  setPathList(value: string[]): FlightDescriptor;
  clearPathList(): FlightDescriptor;
  addPath(value: string, index?: number): FlightDescriptor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: FlightDescriptor): FlightDescriptor.AsObject;
  static serializeBinaryToWriter(message: FlightDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightDescriptor;
  static deserializeBinaryFromReader(
    message: FlightDescriptor,
    reader: jspb.BinaryReader,
  ): FlightDescriptor;
}

export namespace FlightDescriptor {
  export type AsObject = {
    type: FlightDescriptor.DescriptorType;
    cmd: Uint8Array | string;
    pathList: string[];
  };

  export enum DescriptorType {
    UNKNOWN = 0,
    PATH = 1,
    CMD = 2,
  }
}

export class FlightInfo extends jspb.Message {
  getSchema(): Uint8Array | string;
  getSchema_asU8(): Uint8Array;
  getSchema_asB64(): string;
  setSchema(value: Uint8Array | string): FlightInfo;

  getFlightDescriptor(): FlightDescriptor | undefined;
  setFlightDescriptor(value?: FlightDescriptor): FlightInfo;
  hasFlightDescriptor(): boolean;
  clearFlightDescriptor(): FlightInfo;

  getEndpointList(): FlightEndpoint[];
  setEndpointList(value: FlightEndpoint[]): FlightInfo;
  clearEndpointList(): FlightInfo;
  addEndpoint(value?: FlightEndpoint, index?: number): FlightEndpoint;

  getTotalRecords(): number;
  setTotalRecords(value: number): FlightInfo;

  getTotalBytes(): number;
  setTotalBytes(value: number): FlightInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FlightInfo): FlightInfo.AsObject;
  static serializeBinaryToWriter(message: FlightInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightInfo;
  static deserializeBinaryFromReader(message: FlightInfo, reader: jspb.BinaryReader): FlightInfo;
}

export namespace FlightInfo {
  export type AsObject = {
    schema: Uint8Array | string;
    flightDescriptor?: FlightDescriptor.AsObject;
    endpointList: FlightEndpoint.AsObject[];
    totalRecords: number;
    totalBytes: number;
  };
}

export class FlightEndpoint extends jspb.Message {
  getTicket(): Ticket | undefined;
  setTicket(value?: Ticket): FlightEndpoint;
  hasTicket(): boolean;
  clearTicket(): FlightEndpoint;

  getLocationList(): Location[];
  setLocationList(value: Location[]): FlightEndpoint;
  clearLocationList(): FlightEndpoint;
  addLocation(value?: Location, index?: number): Location;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightEndpoint.AsObject;
  static toObject(includeInstance: boolean, msg: FlightEndpoint): FlightEndpoint.AsObject;
  static serializeBinaryToWriter(message: FlightEndpoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightEndpoint;
  static deserializeBinaryFromReader(
    message: FlightEndpoint,
    reader: jspb.BinaryReader,
  ): FlightEndpoint;
}

export namespace FlightEndpoint {
  export type AsObject = {
    ticket?: Ticket.AsObject;
    locationList: Location.AsObject[];
  };
}

export class Location extends jspb.Message {
  getUri(): string;
  setUri(value: string): Location;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
  export type AsObject = {
    uri: string;
  };
}

export class Ticket extends jspb.Message {
  getTicket(): Uint8Array | string;
  getTicket_asU8(): Uint8Array;
  getTicket_asB64(): string;
  setTicket(value: Uint8Array | string): Ticket;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ticket.AsObject;
  static toObject(includeInstance: boolean, msg: Ticket): Ticket.AsObject;
  static serializeBinaryToWriter(message: Ticket, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ticket;
  static deserializeBinaryFromReader(message: Ticket, reader: jspb.BinaryReader): Ticket;
}

export namespace Ticket {
  export type AsObject = {
    ticket: Uint8Array | string;
  };
}

export class FlightData extends jspb.Message {
  getFlightDescriptor(): FlightDescriptor | undefined;
  setFlightDescriptor(value?: FlightDescriptor): FlightData;
  hasFlightDescriptor(): boolean;
  clearFlightDescriptor(): FlightData;

  getDataHeader(): Uint8Array | string;
  getDataHeader_asU8(): Uint8Array;
  getDataHeader_asB64(): string;
  setDataHeader(value: Uint8Array | string): FlightData;

  getAppMetadata(): Uint8Array | string;
  getAppMetadata_asU8(): Uint8Array;
  getAppMetadata_asB64(): string;
  setAppMetadata(value: Uint8Array | string): FlightData;

  getDataBody(): Uint8Array | string;
  getDataBody_asU8(): Uint8Array;
  getDataBody_asB64(): string;
  setDataBody(value: Uint8Array | string): FlightData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlightData.AsObject;
  static toObject(includeInstance: boolean, msg: FlightData): FlightData.AsObject;
  static serializeBinaryToWriter(message: FlightData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlightData;
  static deserializeBinaryFromReader(message: FlightData, reader: jspb.BinaryReader): FlightData;
}

export namespace FlightData {
  export type AsObject = {
    flightDescriptor?: FlightDescriptor.AsObject;
    dataHeader: Uint8Array | string;
    appMetadata: Uint8Array | string;
    dataBody: Uint8Array | string;
  };
}

export class PutResult extends jspb.Message {
  getAppMetadata(): Uint8Array | string;
  getAppMetadata_asU8(): Uint8Array;
  getAppMetadata_asB64(): string;
  setAppMetadata(value: Uint8Array | string): PutResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PutResult.AsObject;
  static toObject(includeInstance: boolean, msg: PutResult): PutResult.AsObject;
  static serializeBinaryToWriter(message: PutResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PutResult;
  static deserializeBinaryFromReader(message: PutResult, reader: jspb.BinaryReader): PutResult;
}

export namespace PutResult {
  export type AsObject = {
    appMetadata: Uint8Array | string;
  };
}
