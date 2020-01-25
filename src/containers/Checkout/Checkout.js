import React, { Component } from "react";
import SandwichIngredient from "../../components/Sandwich/SandwichIngredient/SandwichIngredient";
import classes from "../../components/Sandwich/Sandwich.module.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { purchaseSandwichStart } from "../../store/actions/order";

class Checkout extends Component {
  // state = { //remove this
  //   //temporary
  //   ingredients: null,
  //   totalPrice: 0
  // };
  // componentWillMount() { //not needed anymore. redux store will be used
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      let purchaseSuccessfulRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchaseSuccessfulRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
            // render={props => (  //not needed to pass props anymore using render  due to redux functionality. thus replaced with component
            //   <ContactData
            //     ingredients={this.props.ings}
            //     price={this.props.price}
            //     {...props}
            //   />
            // )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.sandwichBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
