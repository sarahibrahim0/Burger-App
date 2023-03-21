import React from "react";
import ReactAux from "../../hoc/ReactAux";
import classes from "./Layout.module.css"
const Layout = (props) => {

  return <ReactAux>
    <div> toolbar, sidedrawer, backdrop</div>
    <main className={classes.Content}> {props.children} </main>

  </ReactAux>


};

export default Layout;
