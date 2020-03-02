import React from 'react';
import { Component } from "react";
//import wrapper from "/Users/joshnaso/Desktop/ReactRPC/ReactRPC/wrapper.js";
const reactRPC  = require("testreactrpc");
const requests = require("../../helloworld_pb.js");
const clients = require("../../helloworld_grpc_web_pb.js");

reactRPC.build(requests, clients, "http://" + window.location.hostname + ":8080");

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        this.props.Health.check({service: "Greeter", messageType: "HealthCheckRequest"}, {}, (err, response) => {
            console.log(response.getStatus());
        });
        return(
            <div>
                <h1>ReactRPC</h1>
            </div>
        )
    }
}

export default reactRPC.wrapper(App);