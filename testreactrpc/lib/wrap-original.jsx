const React = require("react");

const wrap = {};

wrap.reactWrapper = function(WrappedComponent, functions) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <WrappedComponent {...functions} {...this.props}></WrappedComponent>
      );
    }
  };
};

module.exports = wrap;
