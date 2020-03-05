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

var PROTO_PATH = __dirname + "/helloworld.proto";

var grpc = require("grpc");
var _ = require("lodash");
var async = require("async");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var helloworld = protoDescriptor.helloworld;

/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function doSayHello(call, callback) {
  callback(null, {
    message: "Hello! " + call.request.name + call.request.lastName
  });
}

/**
 * @param {!Object} call
 */
function doSayRepeatHello(call) {
  var senders = [];
  function sender(name) {
    return callback => {
      call.write({
        message: "Hey! " + name
      });
      _.delay(callback, 500); // in ms
    };
  }
  for (var i = 0; i < call.request.count; i++) {
    senders[i] = sender(call.request.name + i);
  }
  async.series(senders, () => {
    call.end();
  });
}

//Health check that uses a timer to determine server healthiness
function doCheck(call, callback) {
  let timer = new Date(); //Start of timer
  //Any additional functionality can go here
  let currentTime = new Date(); //End of timer
  //Testing if the server takes longer than 20 milliseconds to respond
  let currentStatus =
    currentTime.getMilliseconds() > timer.getMilliseconds() + 20
      ? "NOT_SERVING"
      : "SERVING";
  callback(null, {
    status: currentStatus
  });
}

//Checks takes in and responds to the nested message object
//Refer to helloworld.proto and TestNested message
function doSayHelloNested(call, callback) {
  console.log("Server data: ", call.request);
  callback(null, {
    message: "Hello! " + call.request.myName.name + call.request.myName.lastName
  });
}

/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function doSayHelloAfterDelay(call, callback) {
  function dummy() {
    return cb => {
      // delays by 5000 milliseconds
      _.delay(cb, 5000);
    };
  }
  async.series([dummy()], () => {
    callback(null, {
      message: "Hello! " + call.request.name + call.request.lastName
    });
  });
}

/**
 * @return {!Object} gRPC server
 */
function getServer() {
  var server = new grpc.Server();

  //Add greeter service functions
  server.addService(helloworld.Greeter.service, {
    sayHello: doSayHello,
    sayRepeatHello: doSayRepeatHello,
    sayHelloAfterDelay: doSayHelloAfterDelay,
    sayHelloNested: doSayHelloNested // For testing
  });

  //Add health service functions
  server.addService(helloworld.Health.service, {
    check: doCheck //For health checks
  });

  //console.log(healthChecks.Health.service);
  return server;
}

if (require.main === module) {
  var server = getServer();
  server.bind("0.0.0.0:9090", grpc.ServerCredentials.createInsecure());
  server.start();
}

exports.getServer = getServer;
