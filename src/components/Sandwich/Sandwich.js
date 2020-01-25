import React from "react";
import classes from "./Sandwich.module.css";
import SandwichIngredient from "./SandwichIngredient/SandwichIngredient";

const sandwich = props => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      //populate i as counter that serves as a unique key for each successive ingredient.
      return <SandwichIngredient key={igKey + i} type={igKey} />;
    });
  });
  const ingredientAdded = transformedIngredients.reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (ingredientAdded.length === 0) {
    transformedIngredients = <p>Create your sandwich</p>;
  }

  return (
    <div className={classes.Sandwich}>
      <SandwichIngredient type="bread-top" />
      {transformedIngredients}
      <SandwichIngredient type="bread-bottom" />
    </div>
  );
};

export default sandwich;
