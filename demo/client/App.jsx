import React from 'react';
import { Component } from "react";
import SendRest from "./components/sendDataRestful.jsx"

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
            </div>
        )
    }
}

export default App;