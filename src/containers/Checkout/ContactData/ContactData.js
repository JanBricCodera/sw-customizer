import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    }
  };

  componentDidMount() {
    console.log("contactdata loaded");
  }

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    console.log("formdata", formData);

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    // axios        -> copied to sandwichpurchasestart action in store>order.js
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ purchaseProcessing: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ purchaseProcessing: false });
    //     console.log(error);
    //   });
    this.props.onOrderSandwich(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    // console.log("val", this.state.orderForm.name.value);

    // console.log("inputidentifer", inputIdentifier);
    const updatedOrderForm = { ...this.state.orderForm };
    // console.log("updated form content", updatedOrderForm);
    const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  //to be continued
  //   checkValidation = () => {

  //     this.setState({isValid: });
  //   }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input elementType="" elementConfig="" value=""/> */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            elValue={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        {/* <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Postal code"
        /> */}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.purchaseProcessing) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your order information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.sandwichBuilder.ingredients,
    price: state.sandwichBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderSandwich: (orderData, token) =>
      dispatch(actions.purchaseSandwich(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
