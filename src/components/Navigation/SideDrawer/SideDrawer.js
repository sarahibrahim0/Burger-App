import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import ReactAux from "../../../hoc/ReactAux/ReactAux";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <ReactAux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated = {props.isAuth} />
        </nav>
      </div>
    </ReactAux>
  );
};

export default SideDrawer;
