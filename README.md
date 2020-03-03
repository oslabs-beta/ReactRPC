# ReactRPC
![badge](https://img.shields.io/badge/version-v2.0.3.beta%20release-brightgreen)
![badge](https://img.shields.io/badge/build-passing-green?labelColor=444444)
![badge](https://img.shields.io/badge/license-Apache--2.0-green)

Feature library for gRPC-Web. Core functions include: packaging the generated proto messages and service client stubs, a unified API of chainable RPC call methods that support Google's (for Javascript) and Improbable's (for Golang and TypeScript) client-side, server-side and bi-directional streaming. 

Check out the [documentation website](https://firecomm.github.io)!

# Getting Started
## Install
``` 
npm install --save reactrpc
```

## 1. Define a .proto file
The .proto file is the schema for your Servers and client Stubs. It defines the package you will build which will give your Server and Client superpowers -- Remote Procedure Call (RPC) methods. RPC methods define what Message the client Stubs send and receive from the server Handlers.

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

> The HelloRequest message received on either side will be an Object with the properties `name` and `lastName`. The values will be string. You can read more about protobufs and all of the possible Message fields at Google's developer docs [here](https://developers.google.com/protocol-buffers/docs/proto3).

## 2. Generate a Protobuf Messages and Client Service Stub

In order to pass superpowers to our Server and client Stubs, we first need to package our .proto file. 

## For Google's implementation:
To generate the protobuf messages and client service stub class from your
`.proto` definitions, we need the `protoc` binary and the
`protoc-gen-grpc-web` plugin.

You can download the `protoc-gen-grpc-web` protoc plugin from our
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

After the command runs successfully, you should now see two new files generated
in the current directory:

 - `helloworld_pb.js`: this contains the `HelloRequest` and `HelloReply`
   classes
 - `helloworld_grpc_web_pb.js`: this contains the `GreeterClient` class
 
These are also the 2 files that our `client.js` file imported earlier in the
example.

### For Improbable's implementation:

Download protoc from [here](https://github.com/protocolbuffers/protobuf/releases) 



## 3. Create a server
Now that we have our package, we need a Server. Let's import the `Server` class from the Firecomm library.

```javascript
// /server/server.js
const { Server } = require( 'firecomm' );
const server = new Server();
```

> Under the hood, Firecomm extends Google's gRPC core channel configurations. You can pass an Object to the Server as the first argument to configure advanced options. You can see all of the Object properties and the values you can set them to in the gRPC core docs [here](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html).

## 4. Define the server-side Handler

Before we can interact with a client, our Server needs Handlers. Handlers are usually unique to each RPC Method. In order to demonstrate the power of gRPCs, we will be listening for client requests and immediately sending back server responses in a ping-pong pattern. Metadata is sent only once at the start of the exchange, which will trigger Node's built in timers to start clocking the nanoseconds between responses and requests.

```javascript
// /server/chattyMathHandlers.js
function BidiMathHandler(bidi) {
  let start;
  let current;
  let perReq;
  let perSec;
  bidi
    .on('metadata', (metadata) => {
      start = Number(process.hrtime.bigint()); // marks a start time in nanoseconds
      bidi.set({thisSetsMetadata: 'responses incoming'})
      console.log(metadata.getMap()); // maps the special metadata object as a simple Object
    })
    .on('error', (err) => {
      console.error(err)
    })
    .on('data', (benchmark) => {
      bidi.send(
        {
          requests: benchmark.requests, 
          responses: benchmark.responses + 1
        }
      );
      if (benchmark.requests % 10000 === 0) {
        current = Number(process.hrtime.bigint()); // marks the current time in nanoseconds
        perReq = ((current - start) /1000000) / benchmark.requests; // finds the difference in time from start to current, converts nanoseconds to milliseconds, and averages the time per request from total requests
        perSec = 1 / (perReq / 1000); // inverts milliseconds per request to requests per second
      console.log(
        '\nclient address:', bidi.getPeer(), // returns the client address
        '\nnumber of requests:', benchmark.requests, // total requests
        '\navg millisecond speed per request:', perReq,
        '\nrequests per second:', perSec,
      );
    }
  })
}

module.exports = { 
	BidiMathHandler,
}
```

> As I'm sure you've noticed, the Objects we are receiving and sending have exactly the properties and value-types we defined in the Benchmark message in the .proto file. If you attempt to send an incorrectly formatted Object, the RPC Method will coerce the Object into a Message with the correct formatting. Values will be coerced to a default falsey value: `{ aString: '' }`, `{ someObject: {}, anArray: [] }`, or in our BidiMath example `{ requests: 0, responses: 0 }`.

## 5. Add the Services

Let's import the Handler and the package and add each Service to our Server alongside an Object mapping the name of the RPC Method with the Handler we created.

```javascript
// /server/server.js
const { Server } = require( 'firecomm' );
const package = require( '../proto/package.js' );
const { BidiMathHandler } = require ( './chattyMathHandlers.js' );

new Server()
  .addService( package.ChattyMath,   {
  BidiMath: BidiMathHandler,
})
```
> Servers can chain the .addService method as many times as they wish for each Service that we defined in the .proto file. If you have multiple RPC methods in a Service, each should be mapped as a property on the Object with a Handler function as the value. Not mapping all of your RPC Methods will cause a Server error.

## 6. Bind the server to addresses

```javascript
// /server/server.js
const { Server } = require( 'firecomm' );
const package = require( '../proto/package.js' );
const { BidiMathHandler } = require ( './chattyMathHandlers.js' );

new Server()
  .addService( package.ChattyMath,   {
  BidiMath: BidiMathHandler,
})
  .bind('0.0.0.0: 3000')
```
> The .bind method can be passed an array of strings to accept requests at any number of addresses. For example:
> ```javascript
> server.bind( [ 
>   '0.0.0.0: 3000', 
>   '0.0.0.0: 8080', 
>   '0.0.0.0: 9900',
> ] );
> ```
## 7. Start the server
```javascript
// /server/server.js
const { Server } = require( 'firecomm' );
const package = require( '../proto/package.js' );
const { BidiMathHandler } = require ( './chattyMathHandlers.js' );

new Server()
  .addService( 
    package.ChattyMath,   
    { BidiMath: BidiMathHandler }
  )
  .bind('0.0.0.0: 3000')
  .start();
```
> Run your new firecomm/gRPC-Node server with: `node server/server.js`. It may also be worthwhile to map this command to `npm start` in your `package.json`.

## 8.  Create a client Stub for each Service:
Now that the server is up and running, we have to pass superpowers to the client-side. We open channels by connecting each Stub to the same address as a Server is bound to. In order for the Stub to be able to make RPC Method requests we need to pass the package.Service into a newly constructed `Stub`.
```javascript
// /clients/chattyMath.js
const { Stub } = require( 'firecomm' );
const package = require( '../proto/package.js' )
const stub = new Stub( 
	package.ChattyMath, 
	'localhost: 3000', // also can be '0.0.0.0: 3000'
);
```
> Under the hood, Firecomm extends Google's gRPC core channel configurations. You can pass an Object to the Stub as the second argument to configure advanced options. **Note: Any channel configurations on the client Stub should match the configurations on the server it is requesting to.** You can see all of the Object properties and the values you can set them to in the gRPC core docs [here](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html).

## 9. Make requests from the Stub and see how many requests and responses a duplex can make!
Before we can interact with a server, our client Stub needs to invoke the RPC Method. We can also pass any metadata we would like to send at this point as the first argument of the RPC Method. RPC Methods now exist on the Stub just like it was defined in the .proto file because we passed the package.Service into the Stub constructor. Because we defined the RPC Method to send a stream of messages and return a stream of messages, both the client Stub and the server can send and listen for any number of messages over a long-living TCP connection. 

Once the RPC Method is invoked, the client Stub always sends the first request. As soon as the server Handler receives the request, the ping-pong will begin. Similarly to the server Handler, now on the client-side, we will begin listening for server requests and immediately sending back client responses. Again, metadata is received from the server only once at the start of the exchange, which will trigger Node's built in timers to start clocking the nanoseconds between requests and responses.
```javascript
// /clients/chattyMath.js
const { Stub } = require( 'firecomm' );
const package = require( '../proto/package.js' )
const stub = new Stub( 
  package.ChattyMath, 
  'localhost: 3000',
);

let start;
let current;
let perRes;
let perSec;
const bidi = stub.bidiMath({thisIsMetadata: 'let the races begin'})
  .send({requests: 1, responses: 0})
  .on( 'metadata', (metadata) => {
    start = Number(process.hrtime.bigint()); // marks a start time in nanoseconds 
    console.log(metadata.getMap()) // maps the special metadata object as a simple Object
  })
  .on( 'error', (err) => console.error(err))
  .on( 'data', (benchmark) => {
    bidi.send(
      {
        requests: benchmark.requests + 1, 
        responses: benchmark.responses
      }
    )
    if (benchmark.responses % 10000 === 0) {
      current = Number(process.hrtime.bigint()); // marks the current time in nanoseconds 
      perRes = ((current - start) / 1000000) / benchmark.responses; // finds the difference in time from start to current, converts nanoseconds to milliseconds, and averages the time per response from total responses
      perSec = 1 / (perRes / 1000); // inverts milliseconds per response to responses per second
    console.log(
      'server address:', bidi.getPeer(), // returns the server address
      '\ntotal number of responses:', benchmark.responses, // total responses
      '\navg millisecond speed per response:', perRes,
      '\nresponses per second:', perSec,
    )
  }
});
```
> Run your new firecomm/gRPC-Node client with: `node clients/chattyMath.js`. It may also be worthwhile to map this command to a script like `npm run client` in your `package.json`.

Now enjoy the power of gRPCs! See how many requests and responses you can make per second with one duplex RPC method! 

Explore the flexible possibilities! Creatively modify the bidiMath to be full duplex instead of ping-ponging. Add more client Stubs to run services in parallel to one server address, bind multiple addresses to the Server, run multiple clients with their own Stubs requesting from separate addresses, etc. And once you feel comfortable with the clients and servers, dive into modifying the .proto file to change the message fields or add multiple messages with different fields to send and receive, add multiple RPC methods to one Service, or add multiple Services to the package. Then, build the new .proto, add each package.Service to a server, create a Stub with the each matching package.Service and a server address, and explore the endless potential of gRPCs!