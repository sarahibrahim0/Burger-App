import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import ReactAux from "../../../hoc/ReactAux";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  return (

    <ReactAux>"
            <Backdrop show clicked={}/>
    <div className={classes.SideDrawer}>
  <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
    </ReactAux>

  );
};

export default SideDrawer;
