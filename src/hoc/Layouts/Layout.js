import React, { Component } from "react";
import ReactAux from "../ReactAux/ReactAux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    return this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((previousState) => {
      return { showSideDrawer: !previousState.showSideDrawer };
    });
  };

  render() {
    return (
      <ReactAux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}> {this.props.children} </main>
      </ReactAux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
