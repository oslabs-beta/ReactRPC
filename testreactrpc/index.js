// import React from 'react';
// import { Component } from "react";
const { reactWrapper } = require("./lib/wrap-original.js");
const { grpc } = require("@improbable-eng/grpc-web");

const reactRPC = { functions: {} };
let client = {};
let messages = {};
let url_name;
//Sets up the service and message calls through reactRPC
const improbRPC = { functions: {} };
improbRPC.build = function(requests, clients, URL) {
  url_name = URL;
  //map all of requests
  if (requests instanceof Array) {
    for (let i = 0; i < requests.length; i++) {
      for (let props in requests[i]) {
        if (requests[i].hasOwnProperty(props)) {
          messages[props] = requests[i][props];
        }
      }
    }
  } else {
    messages = requests;
  }
  if (clients instanceof Array) {
    for (let i = 0; i < clients.length; i++) {
      for (let props in clients[i]) {
        if (clients[i].hasOwnProperty(props)) {
          client[props] = clients[i][props];
        }
      }
    }
  } else {
    client = clients;
  }
  //console.log("Messages:",messages,"Services",client);
  console.log("client heree: ", client);
  for (let service in client) {
    if (client.hasOwnProperty(service)) {
      improbRPC["functions"][service] = {};
      for (let keys in client[service]) {
        if (
          client[service].hasOwnProperty(keys) &&
          typeof client[service][keys] === "function"
        ) {
          improbRPC["functions"][service][keys] = improbableCreator(
            service,
            keys
          );
        }
      }
    }
  }
  console.log("Imprpbab", improbRPC["functions"]);
  console.log("Client", client);
  console.log("message: ", messages);
};
reactRPC.build = function(requests, clients, URL) {
  //Maps all the requests from the pb file to ReactRPC
  if (requests instanceof Array) {
    for (let i = 0; i < requests.length; i++) {
      for (let props in requests[i]) {
        if (requests[i].hasOwnProperty(props)) {
          messages[props] = requests[i][props];
        }
      }
    }
  } else {
    messages = requests;
  }

  if (clients instanceof Array) {
    for (let i = 0; i < clients.length; i++) {
      for (let props in clients[i]) {
        if (clients[i].hasOwnProperty(props)) {
          if (
            /*props.length > 13 &&*/ props.slice(props.length - 6) ===
              "Client" &&
            !props.includes("Promise")
          ) {
            client[props.slice(0, props.length - 6)] = clients[i][props];
          }
        }
      }
    }
  } else {
    for (let props in clients) {
      if (clients.hasOwnProperty(props)) {
        if (
          /*props.length > 13 &&*/ props.slice(props.length - 6) === "Client" &&
          !props.includes("Promise")
        ) {
          client[props.slice(0, props.length - 6)] = clients[props];
        }
      }
    }
  }

  for (let props in client) {
    if (client.hasOwnProperty(props)) {
      ServiceCreator(props, URL);
    }
  }

  // for (let key in requests) {
  //   if (requests.hasOwnProperty(key)) {
  //     if (key.slice(key.length - 5) === "Reply") {
  //       reactRPC[key] = requests[key];
  //     }
  //     if (key.slice(key.length - 7) === "Request") {
  //       reactRPC[key] = requests[key];
  //       console.log("Request: ", new reactRPC[key]);
  //     }
  //   }
  // }
  // //Maps all the services from clients
  // for (let key in clients) {
  //   if (clients.hasOwnProperty(key)) {
  //     if (key.slice(key.length - 6) === "Client") {
  //       reactRPC[key] = requests[key];
  //       if (!key.includes("Promise")) {
  //         console.log("Key: ", key);
  //         CreateAndCallService(clients, key, URL);
  //       }
  //     }
  //   }
  // }
  //console.log("reactRPC: ", reactRPC);
  //console.log("client: ", client);
  //console.log("messages: ", messages);
};

function improbableCreator(service, method) {
  return function(data, meta, cb) {
    if (typeof data === "object" && data !== null) {
      let req = serialize(data, messages);
      let user = grpc.client(client[service][method], {
        host: url_name
      });
      user.start(grpc.Metadata(meta));
      user.send(req);
      user.onMessage(res => {
        return cb(null, res.toObject());
      });
      user.finishSend();
      return user;
    } else {
      throw new Error(
        "First parameter must be an object with messageType defined"
      );
    }
  };
}
function ServiceCreator(clientName, URL) {
  //Dynamically create new client with passed in URL
  reactRPC.functions[clientName] = {};
  const currClient = new client[clientName](URL, null, null);
  for (let serviceCall in currClient) {
    if (!currClient.hasOwnProperty(serviceCall)) {
      reactRPC.functions[clientName][serviceCall] = function(data, ...args) {
        //Make sure data recieved is an object before sending it to serialize
        if (typeof data === "object" && data !== null) {
          let req = serialize(data, messages);
          const stream = currClient[serviceCall](req, ...args);
          //Add improbable's streaming calls to create uniformity for users
          if (typeof stream === "object") {
            stream.onMessage = function(cb) {
              stream.on("data", cb);
            };
            stream.onHeaders = function(cb) {
              stream.on("status", cb);
            };
            stream.onEnd = function(cb) {
              stream.on("end", cb);
            };
          }
          return stream;
        } else {
          throw new Error(
            "First parameter must be an object with messageType defined"
          );
        }
      };
    }
  }

  //Iterate through all service functions
  // for(prop in reactRPC["client"]){
  //   //Skip unwanted variables
  //   if(prop === "client_" || prop === "hostname_"){
  //     continue;
  //   }

  //   //Set service function to ReactRPC object
  //   reactRPC[prop] = function(data, metadata, callback){
  //     console.log("data: ", data);
  //     //Inputted object must have message type
  //     if(!data['message']){
  //       console.log("data: ", data.message);
  //       throw new Error("No message type specified!");
  //     }
  //     else{
  //       let temp = new reactRPC[data['message']];
  //       for(el in data){
  //         if(el !== 'message'){
  //           let newKey = "set" + el[0].toUpperCase() + el.slice(1).toLowerCase();
  //           if(temp[newKey] !== undefined){
  //             temp[newKey](data[el]);
  //           }
  //           else{
  //             throw new Error("Message type is invalid: ", el);
  //           }
  //         }
  //       }
  //       reactRPC['client'][prop](temp, metadata, callback);
  //     }
  //   }
  // }
}
function serialize(data, messages) {
  //Build in check if data is an object/array. If not, just return the value
  if (Array.isArray(data)) {
    throw new Error("Type must be an object or primitive");
  }
  if (typeof data !== "object" || data === null) {
    return data;
  }
  //Check to make sure that the user has given a non null messageType property
  if (!data["msgType"]) {
    throw new Error("MessageType not specified!");
  }
  //Check that the messageType exists in the messages object
  if (!messages[data["msgType"]]) {
    throw new Error("MessageType is invalid");
  }
  //Create a new instance of the message object using the messgeType property that the user defines for us
  let newMessage = new messages[data["msgType"]]();
  for (let prop in data) {
    //Loop through all the properties in the object that are not messageType
    if (data.hasOwnProperty(prop) && prop !== "msgType") {
      //If data is an array we need to do a for loop and recursively turn each element into a message object to add
      if (Array.isArray(data[prop])) {
        //find the addElement key
        let newKey =
          "add" + prop[0].toUpperCase() + prop.slice(1).toLowerCase();
        //If addElement method is undefined throw Error saying cannot find the proper method
        //Otherwise loop through array and add all the elements to the method
        if (newMessage[newKey] !== undefined) {
          for (let el of data[prop]) {
            let val = serialize(data[prop][el], messages);
            newMessage[newKey](val);
          }
        } else {
          throw new Error("Message field is invalid: ", prop);
        }
      } else {
        //Otherwise we just set the field with the value of the property
        let newKey =
          "set" + prop[0].toUpperCase() + prop.slice(1).toLowerCase();
        //If method cannot be found throw error
        if (newMessage[newKey] !== undefined) {
          let val = serialize(data[prop], messages);
          newMessage[newKey](val);
        } else {
          throw new Error("Message field is invalid: ", prop);
        }
      }
    }
  }
  return newMessage;
}
reactRPC.wrapper = function(WrappedComponent) {
  return reactWrapper(WrappedComponent, reactRPC.functions);
};

// function Wrapper(WrappedComponent){
//   return class extends Component{
//       constructor(props){
//           super(props);
//       }

//       render(){
//         let obj = {};
//           for(let props in reactRPC.functions){
//             obj[props] = reactRPC.functions[props];
//           }

//           return (<WrappedComponent {...obj} {...this.props}></WrappedComponent>);
//       }
//   }
// }

module.exports = { improbRPC, reactRPC };
