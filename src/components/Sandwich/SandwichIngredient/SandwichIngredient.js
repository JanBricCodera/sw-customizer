import React, { Component } from "react";
import classes from "./SandwichIngredient.module.css";
import PropTypes from "prop-types";

//adding a dynamic ingredient component

class SandwichIngredient extends Component {
  render() {
    let ingredient = null;
    console.log("[SandwichIngredient.js]props.type", this.props.type);

    switch (this.props.type) {
      //@@TODO proptype validation to verify that the type property is really passed into this component
      //note: integration of prop-types validation works on both class-based and function based component

      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}> </div>
            <div className={classes.Seeds2}> </div>
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case "bacon":
        ingredient = <div className={classes.Bacon}></div>;
        break;
      case "salad":
        ingredient = <div className={classes.Salad}></div>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

SandwichIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default SandwichIngredient;
