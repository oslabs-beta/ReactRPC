/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
import React from 'react';
import {render} from 'react-dom';
import App from './client/components/app.jsx';
// // helloworld_pb.js is for messages
// const { HelloRequest, RepeatHelloRequest,
//   HelloReply } = require('./helloworld_pb.js');


// const reactRPC = require("testreactrpc");
// const requests = require("./helloworld_pb.js");

// const clients = require("./helloworld_grpc_web_pb.js");

// reactRPC.build(requests, clients, "http://" + window.location.hostname + ":8080");
// // helloworld_pb.js is for messages
// const { HelloRequest, RepeatHelloRequest,
//   HelloReply } = require('./helloworld_pb.js');

// import { HelloRequest, RepeatHelloRequest,
//    HelloReply } from './helloworld_pb.js';

// // helloworld_grpc_web_pb is for services for the client and server

// import { GreeterClient } from './helloworld_grpc_web_pb.js';
// reactRPC.functions.Greeter.sayHello({name: "Josh", lastName: " Naso", messageType: "HelloRequest"}, {}, (err, response) => {
//   console.log(response.getMessage());
// });



// // hostname is just the path (localhost)
// var client = new GreeterClient(
//   "http://" + window.location.hostname + ":8080", 
//   null, 
//   null
// );

// var request = new HelloRequest();
// request.setName("Josh");
// request.setLastname(" Naso");
// client.sayHello(request, {}, (err, response) => {
//   console.log(response.getMessage());
// });

// let client = reactRPC['client'];
// console.log(client);
// client = new reactRPC.GreeterClient()

// // simple unary call
//request.setName("World");

// // defines a functionally for the client side - sayHello service
// client.sayHello(request, {}, (err, response) => {
//   console.log(response.getMessage());
// });

// server streaming call
// var streamRequest = new reactRPC.RepeatHelloRequest();
// streamRequest.setName("World");
// streamRequest.setCount(5);

// // defining the sayHello service
// var stream = client.sayRepeatHello(streamRequest, {});
// // this is called everytime we get something from the stream
// stream.on("data", response => {
//   console.log(response.getMessage());
// });

// deadline exceeded
// var deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 1);

// // adds a deadline to the sayHello service
// client.sayHelloAfterDelay(
//   request,
//   { deadline: deadline.getTime() },
//   (err, response) => {
//     console.log("Got error, code = " + err.code + ", message = " + err.message);
//   }
// );

render(
  <App></App>,
  document.getElementById('main')
);
