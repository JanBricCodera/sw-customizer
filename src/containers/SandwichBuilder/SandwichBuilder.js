import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Sandwich from "../../components/Sandwich/Sandwich";
import BuildControls from "../../components/Sandwich/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Sandwich/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as sandwichBuilderActions from "../../store/actions/index";

//file is under containers to contain the concepf of stateful components
//you set the states under the containers folder

class SandwichBuilder extends Component {
  state = {
    // ingredients: null, //not needed anymore since we are not using local state for ingredients.we are now using redux
    // totalPrice: 4, //base price //not needed anymore since we are not using local state for ingredients.we are now using redux
    purchasing: false,
    purchaseProcessing: false
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  // addIngredientHandler = type => { //Replaced with redux implementation
  //   //+ button is pressed
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredient[type] = newCount;

  //   //price addition
  //   const ingredientPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + ingredientPrice;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  // };

  // removeIngredientHandler = type => { //Replaced with redux implementation
  //   //- button is pressed
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const newCount = oldCount - 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredient[type] = newCount;

  //   //price deduction
  //   const ingredientPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - ingredientPrice;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //v1 start
    // this.setState({ purchaseProcessing: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Jan Codera",
    //     address: {
    //       street: "Banilad",
    //       zipCode: "6000",
    //       country: "Philippines"
    //     },
    //     email: "torridfyre@gmail.com"
    //   },
    //   deliveryMethod: "express"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ purchaseProcessing: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ purchaseProcessing: false, purchasing: false });
    //     console.log(error);
    //   });
    //v1 end
    //v2 start            //not needed anymore.redux implementation is used instead
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    //v2 end
    this.props.onInitPurchase();
    this.props.history.push("/checkout"); //instead just use push the checkout url and get the ingredients from the redux store
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    var x = 0;
    var orderButtonState = false; //variable used to determine if order now button should be enabled
    for (let key in disabledInfo) {
      // disabledInfo[key] <= 0
      //   ? (disabledInfo[key] = true)
      //   : (disabledInfo[key] = false);

      x += disabledInfo[key];
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    if (x <= 0) orderButtonState = true;

    let sandwichCoreElementsSwitcher = this.props.error ? (
      <p> Something went wrong. Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummarySwitcher = null;

    if (this.props.ings) {
      sandwichCoreElementsSwitcher = (
        <Aux>
          <Sandwich ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            disabledOrderButton={orderButtonState}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummarySwitcher = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.purchaseProcessing) {
      orderSummarySwitcher = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummarySwitcher}
        </Modal>
        {sandwichCoreElementsSwitcher}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.sandwichBuilder.ingredients,
    price: state.sandwichBuilder.totalPrice,
    error: state.sandwichBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(sandwichBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(sandwichBuilderActions.removeIngredient(ingName)),
    onInitIngredients: ingName =>
      dispatch(sandwichBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(sandwichBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(sandwichBuilderActions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SandwichBuilder, axios));
