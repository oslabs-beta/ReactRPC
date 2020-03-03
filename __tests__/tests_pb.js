const { reactRPC } = require("testreactrpc");
const requests = require("../helloworld_pb.js");
const clients = require("../helloworld_grpc_web_pb.js");

let response;
let healthResponse;
let nestedResponse;

beforeAll(done => {
  reactRPC.build(
    requests,
    clients,
    "http://" + window.location.hostname + ":8080"
  );
  reactRPC.functions.Greeter.sayHello(
    { name: "John", lastName: " Doe", msgType: "HelloRequest" },
    {},
    (err, res) => {
      response = res.getMessage();
      done();
    }
  );
});

beforeAll(done => {
  reactRPC.functions.Health.check(
    { service: "Greeter", msgType: "HealthCheckRequest" },
    {},
    (err, response) => {
      healthResponse = response.getStatus();
      done();
    }
  );
});

beforeAll(done => {
  reactRPC.functions.Greeter.sayHelloNested(
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

describe("ReactRPC should have built in keys", () => {
  it("ReactRPC should be an Object", () => {
    expect(reactRPC).toBeInstanceOf(Object);
  });
  it("ReactRPC should have build", () => {
    expect(reactRPC.build).not.toEqual(undefined);
  });
  it("ReactRPC should have wrapper", () => {
    expect(reactRPC.wrapper).not.toEqual(undefined);
  });
  it("ReactRPC should have functions", () => {
    expect(reactRPC.functions).not.toEqual(undefined);
  });
});

describe("ReactRPC should have services", () => {
  it("ReactRPC should have Greeter", () => {
    expect(reactRPC.functions.Greeter).not.toEqual(undefined);
  });

  it("ReactRPC Greeter should have sayHello service", () => {
    expect(reactRPC.functions.Greeter.sayHello).not.toEqual(undefined);
  });

  it("ReactRPC Greeter should have sayRepeatHello service", () => {
    expect(reactRPC.functions.Greeter.sayRepeatHello).not.toEqual(undefined);
  });

  it("ReactRPC Greeter should have sayHelloAfterDelay service", () => {
    expect(reactRPC.functions.Greeter.sayHelloAfterDelay).not.toEqual(
      undefined
    );
  });

  it("ReactRPC should have Health", () => {
    expect(reactRPC.functions.Health).not.toEqual(undefined);
  });

  it("ReactRPC healthshould have Check service", () => {
    expect(reactRPC.functions.Health.check).not.toEqual(undefined);
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
