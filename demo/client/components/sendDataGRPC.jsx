import React from 'react';
import { Component } from "react";
import styled from "styled-components";
const { reactRPC } = require("testreactrpc");

const requests = require("../../../googleSpec/helloworld_pb");
const clients = require("../../../googleSpec/helloworld_grpc_web_pb.js");

reactRPC.build(
  requests,
  clients,
  "http://" + window.location.hostname + ":8080"
);
const SuperDiv = styled.div`
    border-style: solid;
    width: 30%;
    padding: 8px;
`;

class SendGRPC extends Component{
    constructor(props){
        super(props);

        this.state = {
            timer: 0,
            counter: 0,
            average: 0, 
            currentMessage: undefined
        };

        this.getDataGRPC = this.getDataGRPC.bind(this);
    }

    getDataGRPC(input){
        let startTime = Date.now();
        let stream = this.props.Greeter.sayRepeatHello({ name: input, count: 5, msgType: "RepeatHelloRequest" }, {})
        stream.on("data", response => {
            console.log(response.getMessage());
            let currentTime = Date.now();
            // console.log("Start: ", startTime.getMilliseconds());
            // console.log("End: ", startTime.getMilliseconds());
            let totalTime = currentTime - startTime;
            console.log("TotalTime: ", totalTime);
            const timerT = this.state.timer + totalTime;
            const counterT = this.state.counter + 1;
            const averageT = (timerT / counterT).toFixed(2);
            this.setState({
                timer: timerT,
                counter: counterT, 
                average: averageT, 
                currentMessage: response.getMessage()
            })
        });
    }

    render(){
        const data = [];
        if(this.state.currentMessage){
            data.push(<div><h2>Server message: {this.state.currentMessage}</h2>
            <br></br> 
            <h2>Total time(ms): {this.state.timer}</h2>
            <br></br> 
            <h2>Average time(ms): {this.state.average}</h2>
            </div>
            );
        }
        console.log("Props: ", this.props);
        return(
            <SuperDiv>
              <input type = "text" id = "grpcData"></input>
              <button onClick = {() => {
                  let arr = {};
                  this.getDataGRPC(document.getElementById("grpcData").value);
              }}>Send Data</button>

              {data}
            </SuperDiv>
        )
    }
}

export default reactRPC.wrapper(SendGRPC);