const { googleRPC } = require("testreactrpc");
const requests = require("../helloworld_pb.js");
const clients = require("../helloworld_grpc_web_pb.js");

let response;
let healthResponse;
let nestedResponse;

beforeAll(done => {
  googleRPC.build(
    requests,
    clients,
    "http://" + window.location.hostname + ":8080"
  );
  googleRPC.functions.Greeter.sayHello(
    { name: "John", lastName: " Doe", msgType: "HelloRequest" },
    {},
    (err, res) => {
      response = res.getMessage();
      done();
    }
  );
});

beforeAll(done => {
  googleRPC.functions.Health.check(
    { service: "Greeter", msgType: "HealthCheckRequest" },
    {},
    (err, response) => {
      healthResponse = response.getStatus();
      done();
    }
  );
});

beforeAll(done => {
  googleRPC.functions.Greeter.sayHelloNested(
    {
      myName: { name: "John", lastName: " Doe", msgType: "FullName" },
      msgType: "TestNested"
    },
    {},
    (err, response) => {
      nestedResponse = response.getMessage();
      done();
    }
  );
});

describe("googleRPC should have built in keys", () => {
  it("googleRPC should be an Object", () => {
    expect(googleRPC).toBeInstanceOf(Object);
  });
  it("googleRPC should have build", () => {
    expect(googleRPC.build).not.toEqual(undefined);
  });
  it("googleRPC should have wrapper", () => {
    expect(googleRPC.wrapper).not.toEqual(undefined);
  });
  it("googleRPC should have functions", () => {
    expect(googleRPC.functions).not.toEqual(undefined);
  });
});

describe("googleRPC should have services", () => {
  it("googleRPC should have Greeter", () => {
    expect(googleRPC.functions.Greeter).not.toEqual(undefined);
  });

  it("googleRPC Greeter should have sayHello service", () => {
    expect(googleRPC.functions.Greeter.sayHello).not.toEqual(undefined);
  });

  it("googleRPC Greeter should have sayRepeatHello service", () => {
    expect(googleRPC.functions.Greeter.sayRepeatHello).not.toEqual(undefined);
  });

  it("googleRPC Greeter should have sayHelloAfterDelay service", () => {
    expect(googleRPC.functions.Greeter.sayHelloAfterDelay).not.toEqual(
      undefined
    );
  });

  it("googleRPC should have Health", () => {
    expect(googleRPC.functions.Health).not.toEqual(undefined);
  });

  it("googleRPC healthshould have Check service", () => {
    expect(googleRPC.functions.Health.check).not.toEqual(undefined);
  });
});

describe("Unary function should be able to send data", () => {
  it("Should be able to send strings", () => {
    expect(response).toEqual("Hello! John Doe");
  });

  it("Should have health checks", () => {
    expect(healthResponse).toEqual(1);
  });

  it("Should be able to handle nested messages", () => {
    expect(nestedResponse).toEqual("Hello! John Doe");
  });
});
