import React from 'react';
import { Component } from "react";
import SendRest from "./components/sendDataRestful.jsx"
import SendGRPC from "./components/sendDataGRPC.jsx"

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
              <h1>Hello Allen!</h1>
              <h2>RESTfulAPI</h2>
              <SendRest></SendRest>
              <h2>gRPC</h2>
              <SendGRPC></SendGRPC>
            </div>
        )
    }
}

export default App;