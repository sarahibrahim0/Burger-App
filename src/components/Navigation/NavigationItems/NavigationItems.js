import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/"> Burger Builder </NavigationItem>
     {props.isAuthenticated? <NavigationItem link="/orders"> Orders </NavigationItem> : null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout"> Log Out</NavigationItem>
      ) : (
        <NavigationItem link="/auth"> authentication</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
