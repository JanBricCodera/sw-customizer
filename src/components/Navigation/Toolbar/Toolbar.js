import React from "react";
import classes from "./Toolbar.module.css";
import LOGO from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <LOGO height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
