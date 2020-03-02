const React = require('react');
const { Component } =  require("react");


function wrapper(WrappedComponent, reactRPC){
    return class extends Component{
        constructor(props){
            super(props);
        }

        render(){
        let obj = {};
          for(let props in reactRPC.functions){
            obj[props] = reactRPC.functions[props];
          }
            return <WrappedComponent {...obj} {...this.props}></WrappedComponent>
        }
    }
}


module.exports = { wrapper };


