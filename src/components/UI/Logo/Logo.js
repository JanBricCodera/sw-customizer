import React from "react";
import sandwichLogo from "../../../assets/images/sandwich-logo.png";
import classes from "./Logo.module.css";

const logo = props => (
  <div
    className={classes.Logo}
    style={{ height: props.height, marginLeft: props.marginLeft }}
  >
    <img src={sandwichLogo} alt="My sandwich" />
  </div>
);

export default logo;
