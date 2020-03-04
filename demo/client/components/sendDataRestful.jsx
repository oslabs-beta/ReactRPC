import React from 'react';
import { Component } from "react";
import styled from "styled-components";
import { json } from 'body-parser';

const SuperDiv = styled.div`
    border-style: solid;
    width: 30%;
    padding: 8px;
`;

class SendRest extends Component{
    constructor(props){
        super(props);

        this.state = {
            timer: 0,
            counter: 0,
            average: 0, 
            currentMessage: undefined
        };

        this.getDataRestful = this.getDataRestful.bind(this);
    }

    getDataRestful(input){
        let startTime = Date.now();
        fetch("/restful", {method: "POST", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: input})
        })
        .then((data) => data.json())
        .then((data) => {
            let currentTime = Date.now();
            let totalTime = currentTime - startTime;
            console.log("Data: ", data);
            console.log("TotalTime: ", totalTime);
            const timerT = this.state.timer + totalTime;
            const counterT = this.state.counter + 1;
            const averageT = (timerT / counterT).toFixed(2);
            //const array = [...this.state.currentMessage];
            //array.push(data.message);
            this.setState({
                timer: timerT,
                counter: counterT, 
                average: averageT, 
                currentMessage: data.message
            })
        })
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
        console.log("State: ", this.state);
        return(
            <SuperDiv>
              <input type = "text" id = "restData"></input>
              <button onClick = {() => {
                  let arr = {};
                  this.getDataRestful(document.getElementById("restData").value);
              }}>Send Data</button>

              {data}
            </SuperDiv>
        )
    }
}

export default SendRest;