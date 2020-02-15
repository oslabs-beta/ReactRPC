import React from 'react';
import { Component } from "react";

function wrapper(WrappedComponent, Num){
    return class extends Component{
        constructor(props){
            super(props);

            this.state = {
                myNum: Num 
            }
        }

        helloWorld(){
            console.log("Hello High Order!");
        }

        render(){
            return <WrappedComponent hello = {this.helloWorld} myNum = {this.state.myNum}></WrappedComponent>
        }
    }
}

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        this.props.hello();
        console.log(this.props.myNum);
        return(
            <div>
                <h1>ReactRPC</h1>
            </div>
        )
    }
}

export default wrapper(App, 50);