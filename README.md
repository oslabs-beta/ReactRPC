# ReactRPC
![badge](https://img.shields.io/badge/version-v2.0.3.beta%20release-brightgreen)
![badge](https://img.shields.io/badge/build-passing-green?labelColor=444444)
![badge](https://img.shields.io/badge/license-Apache--2.0-green)

Full featured integration library for React and gRPC-Web. Core functions include: packaging the generated proto messages and client stubs, a unified API of gRPC call methods that support Google's and Improbable's gRPC-web specs for unary, client streaming, server streaming and bi-directional streaming. 

# Getting Started
## Install
``` 
npm install --save reactrpc
```

## 1. Define the Services
Create proto files as the schema for your Server and Client Stubs.  It should define the gRPC call methods needed to communicate between the Server and Browser. These files will be used to give your components superpowers -- Remote Procedure Call (RPC) methods. 

`helloworld.proto`
```protobuf
syntax = "proto3";

package helloworld;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```
`book_service.proto`
```protobuf
syntax = "proto3";

package examplecom.library;

message Book {
  int64 isbn = 1;
  string title = 2;
  string author = 3;
}

message GetBookRequest {
  int64 isbn = 1;
}

message QueryBooksRequest {
  string author_prefix = 1;
}

service BookService {
  rpc GetBook(GetBookRequest) returns (Book) {}
  rpc QueryBooks(QueryBooksRequest) returns (stream Book) {}
}

```

## 2. Generate a Protobuf Messages and Client Service Stub

In order to pass superpowers to our Browser, we first need to package our .proto file. 

## For Google's implementation:
To generate the protobuf messages and client service stub class from your
`.proto` definitions, we need the `protoc` binary and the
`protoc-gen-grpc-web` plugin.

You can download the `protoc-gen-grpc-web` protoc plugin from Google's
[release](https://github.com/grpc/grpc-web/releases) page:

If you don't already have `protoc` installed, you will have to download it
first from [here](https://github.com/protocolbuffers/protobuf/releases).

Make sure they are both executable and are discoverable from your PATH.

For example, in MacOS, you can do:

```
$ sudo mv ~/Downloads/protoc-gen-grpc-web-1.0.7-darwin-x86_64 \
  /usr/local/bin/protoc-gen-grpc-web
$ chmod +x /usr/local/bin/protoc-gen-grpc-web
```

When you have both `protoc` and `protoc-gen-grpc-web` installed, you can now
run this command:

```sh
$ protoc -I=. helloworld.proto \
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```

After the command runs successfully on your `[name of proto].proto` you should see two generated files `[name of proto]_pb.js` which contains the messages and `[name of proto]_grpc_web_pb.js` that contains the services:

For instance the `helloworld.proto` file will generate to:
 - messages : `helloworld_pb.js`    
 - services : `helloworld_grpc_web_pb.js` 
 
## For Improbable's implementation:

For the latest stable version of the ts-protoc-gen plugin:

```
npm install ts-protoc-gen
```

Download or install protoc (the protocol buffer compiler) for your platform from the github releases page or via a package manager (ie: brew, apt).

Download protoc from [here](https://github.com/protocolbuffers/protobuf/releases) 

When you have both `protoc` and `ts-protoc-gen` installed, you can now run this command:

```
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./ts/_proto \
  --ts_out=service=true:./ts/_proto \
  ./proto/examplecom/library/book_service.proto
```
After the command runs successfully on your `[insert_name].proto` you should see two generated files `[insert_name]_pb.js` which contains the messages and `[insert_name]_pb_service.js` that contains the services:

For instance for the helloworld.proto you should see:
 - messages : `book_service_pb.js`
 - services : `book_service_pb_service.js`


## 3. Create proxy server

In order for gRPC-web to communicate with other gRPC servers, it requires a proxy server as a translation layer to convert between gRPC-web protobuffers and gRPC protobuffers. Links to examples on how to set those up can be found [here](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld) (Envoy proxy) and [here](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy) (Improbable's proxy)*

>*Note: To enable bidirectional/client-side streaming you must use Improbable's spec and its proxy with websockets enabled


## 4. Define a message

We define a request message by creating an object with the keys as the message field along with a `msgType` property specifying a message that we set in the proto file. Here is an example of a `HelloRequest` message in the `helloworld.proto` file :


```javascript
const message = { name: "John", lastName: "Doe", msgType: "HelloRequest" }
```

## 5. Create the function

We define a function by listing its service and procedure calls on `this.props`. We then pass in the message we defined above, and an object with any metadata data required (learn more about metadata [here](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md)). For unary calls a third parameter of a callback is required while streaming calls have built in event listeners.


```javascript
// unary call:

this.props.Greeter.sayHello(
  message,
      {},
      (err, response) => {
        console.log(response)
      }
    );

// streaming call

const stream = this.props.Greeter.sayRepeatHello(
  message,
      {}
    );
    stream.onMessage(res => {
      console.log(res.getMessage());
    });
```

>ReactRPC library supports unary, client-side, server-side and bi-directional streaming.  

Check out the [documentation website] for more details on defining messages and sending functions!