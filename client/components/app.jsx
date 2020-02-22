import React from 'react';
import { Component } from "react";

const reactRPC = require("../../testreactrpc");
const requests = require("../../helloworld_pb.js");

const clients = require("../../helloworld_grpc_web_pb.js");

reactRPC.build(requests, clients, "http://" + window.location.hostname + ":8080");

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        this.props.Greeter.sayHello({name: "Josh", lastName: " Naso", messageType: "HelloRequest"}, {}, (err, response) => {
               console.log(response.getMessage());
        });
        return(
            <div>
                <h1>ReactRPC</h1>
            </div>
        )
    }
}

export default reactRPC.wrapper(App);