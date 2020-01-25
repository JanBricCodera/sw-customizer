import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import SandwichBuilder from "./containers/SandwichBuilder/SandwichBuilder";
// import Checkout from "./containers/Checkout/Checkout";//note(s):this is replaced with lazy loading implementation
// import Orders from "./containers/Orders/Orders";//note(s):this is replaced with lazy loading implementation
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
// import Auth from "./containers/Auth/Auth"; //note(s):this is replaced with lazy loading implementation
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={SandwichBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};
// export default withRouter(connect(null, mapDispatchToProps)(App));

export default connect(null, mapDispatchToProps)(App);
