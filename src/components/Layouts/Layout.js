import React from "react";
import ReactAux from "../../hoc/ReactAux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  return (
    <ReactAux>
      {/* <div> toolbar, sidedrawer, backdrop</div> */}
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}> {props.children} </main>
    </ReactAux>
  );
};

export default Layout;
