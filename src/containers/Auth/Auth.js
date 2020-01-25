import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  inputChangedHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  componentDidMount() {
    if (!this.props.currentlyBuilding && this.props.authRedirectPath !== "/") {
      //indicates that we are redirected to checkout even though we did not add ingredients
      //reset the path whenever we reach to auth page without building a sandwich
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let errorMessage = null;
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        elValue={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let signInRedirect = null;
    if (this.props.isAuthenticated) {
      signInRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {signInRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {this.state.isSignUp ? (
            <span
              style={{
                textAlign: "left",
                display: "block",
                marginLeft: "10px"
              }}
            >
              <h5>Sign-up</h5>
            </span>
          ) : (
            <span
              style={{
                textAlign: "left",
                display: "block",
                marginLeft: "10px"
              }}
            >
              <h5>Sign-In</h5>
            </span>
          )}
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <hr />
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignUp ? "Sign-In" : "Sign-Up"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    currentlyBuilding: state.sandwichBuilder.currentlyBuilding,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
