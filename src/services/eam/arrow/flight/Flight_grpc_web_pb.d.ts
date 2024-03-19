import type * as grpcWeb from 'grpc-web';

import type * as Flight_pb from './Flight_pb';

export class FlightServiceClient {
  constructor(
    hostname: string,
    credentials?: null | Record<string, string>,
    options?: null | Record<string, any>,
  );

  listFlights(
    request: Flight_pb.Criteria,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.FlightInfo>;

  getFlightInfo(
    request: Flight_pb.FlightDescriptor,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError, response: Flight_pb.FlightInfo) => void,
  ): grpcWeb.ClientReadableStream<Flight_pb.FlightInfo>;

  getSchema(
    request: Flight_pb.FlightDescriptor,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError, response: Flight_pb.SchemaResult) => void,
  ): grpcWeb.ClientReadableStream<Flight_pb.SchemaResult>;

  doGet(
    request: Flight_pb.Ticket,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.FlightData>;

  doAction(
    request: Flight_pb.Action,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.Result>;

  listActions(
    request: Flight_pb.Empty,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.ActionType>;
}

export class FlightServicePromiseClient {
  constructor(
    hostname: string,
    credentials?: null | Record<string, string>,
    options?: null | Record<string, any>,
  );

  listFlights(
    request: Flight_pb.Criteria,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.FlightInfo>;

  getFlightInfo(
    request: Flight_pb.FlightDescriptor,
    metadata?: grpcWeb.Metadata,
  ): Promise<Flight_pb.FlightInfo>;

  getSchema(
    request: Flight_pb.FlightDescriptor,
    metadata?: grpcWeb.Metadata,
  ): Promise<Flight_pb.SchemaResult>;

  doGet(
    request: Flight_pb.Ticket,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.FlightData>;

  doAction(
    request: Flight_pb.Action,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.Result>;

  listActions(
    request: Flight_pb.Empty,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<Flight_pb.ActionType>;
}
