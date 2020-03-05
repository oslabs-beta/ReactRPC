declare const reactWrapper: any;
declare const grpc: any;
interface Setup {
  functions: object;
  build: object;
  wrapper: object;
}
declare const googleRPC: Setup;
declare let client: object;
declare let messages: object;
declare let url_name: string;
declare const improbRPC: Setup;
declare function improbableCreator(service: string, method: string): any;
declare function ServiceCreator(
  clientName: string,
  URL: string,
  config?: any,
  security?: any
): void;
declare function serialize(data: any, messages: object): any;
