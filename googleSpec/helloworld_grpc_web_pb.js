/**
 * @fileoverview gRPC-Web generated client stub for helloworld
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.helloworld = require('./helloworld_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.GreeterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.GreeterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.helloworld.HelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodDescriptor_Greeter_SayHello = new grpc.web.MethodDescriptor(
  '/helloworld.Greeter/SayHello',
  grpc.web.MethodType.UNARY,
  proto.helloworld.HelloRequest,
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.HelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodInfo_Greeter_SayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @param {!proto.helloworld.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello,
      callback);
};


/**
 * @param {!proto.helloworld.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.HelloReply>}
 *     A native promise that resolves to the response
 */
proto.helloworld.GreeterPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/helloworld.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.helloworld.RepeatHelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodDescriptor_Greeter_SayRepeatHello = new grpc.web.MethodDescriptor(
  '/helloworld.Greeter/SayRepeatHello',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.helloworld.RepeatHelloRequest,
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.RepeatHelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodInfo_Greeter_SayRepeatHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @param {!proto.helloworld.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/helloworld.Greeter/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayRepeatHello);
};


/**
 * @param {!proto.helloworld.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterPromiseClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/helloworld.Greeter/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayRepeatHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.helloworld.HelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodDescriptor_Greeter_SayHelloAfterDelay = new grpc.web.MethodDescriptor(
  '/helloworld.Greeter/SayHelloAfterDelay',
  grpc.web.MethodType.UNARY,
  proto.helloworld.HelloRequest,
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.HelloRequest,
 *   !proto.helloworld.HelloReply>}
 */
const methodInfo_Greeter_SayHelloAfterDelay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @param {!proto.helloworld.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterClient.prototype.sayHelloAfterDelay =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.Greeter/SayHelloAfterDelay',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloAfterDelay,
      callback);
};


/**
 * @param {!proto.helloworld.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.HelloReply>}
 *     A native promise that resolves to the response
 */
proto.helloworld.GreeterPromiseClient.prototype.sayHelloAfterDelay =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/helloworld.Greeter/SayHelloAfterDelay',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloAfterDelay);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.helloworld.TestNested,
 *   !proto.helloworld.HelloReply>}
 */
const methodDescriptor_Greeter_SayHelloNested = new grpc.web.MethodDescriptor(
  '/helloworld.Greeter/SayHelloNested',
  grpc.web.MethodType.UNARY,
  proto.helloworld.TestNested,
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.TestNested} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.TestNested,
 *   !proto.helloworld.HelloReply>}
 */
const methodInfo_Greeter_SayHelloNested = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.HelloReply,
  /**
   * @param {!proto.helloworld.TestNested} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HelloReply.deserializeBinary
);


/**
 * @param {!proto.helloworld.TestNested} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterClient.prototype.sayHelloNested =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.Greeter/SayHelloNested',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloNested,
      callback);
};


/**
 * @param {!proto.helloworld.TestNested} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.HelloReply>}
 *     A native promise that resolves to the response
 */
proto.helloworld.GreeterPromiseClient.prototype.sayHelloNested =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/helloworld.Greeter/SayHelloNested',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloNested);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.HealthClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.HealthPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.helloworld.HealthCheckRequest,
 *   !proto.helloworld.HealthCheckResponse>}
 */
const methodDescriptor_Health_Check = new grpc.web.MethodDescriptor(
  '/helloworld.Health/Check',
  grpc.web.MethodType.UNARY,
  proto.helloworld.HealthCheckRequest,
  proto.helloworld.HealthCheckResponse,
  /**
   * @param {!proto.helloworld.HealthCheckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HealthCheckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.HealthCheckRequest,
 *   !proto.helloworld.HealthCheckResponse>}
 */
const methodInfo_Health_Check = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.HealthCheckResponse,
  /**
   * @param {!proto.helloworld.HealthCheckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.HealthCheckResponse.deserializeBinary
);


/**
 * @param {!proto.helloworld.HealthCheckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.HealthCheckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.HealthCheckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.HealthClient.prototype.check =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.Health/Check',
      request,
      metadata || {},
      methodDescriptor_Health_Check,
      callback);
};


/**
 * @param {!proto.helloworld.HealthCheckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.HealthCheckResponse>}
 *     A native promise that resolves to the response
 */
proto.helloworld.HealthPromiseClient.prototype.check =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/helloworld.Health/Check',
      request,
      metadata || {},
      methodDescriptor_Health_Check);
};


module.exports = proto.helloworld;

