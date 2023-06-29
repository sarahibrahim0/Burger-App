import logo from "./logo.svg";
import "./App.css";
import Layout from "./hoc/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Routes, Route, withRouter, Navigate } from "react-router-dom";
import ContactData from "./containers/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/auth";
import { Component, Suspense } from "react";
import { lazy } from 'react';
import Spinner from "./components/UI/Spinner/Spinner";

const LazyOrders = lazy(() => import('./containers/Orders/Orders'));
const LazyCheckout = lazy(() => import("./containers/Checkout/Checkout"));

class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
          <Suspense fallback=<Spinner/>>
          <Routes>

<Route path="/auth" element={<Auth />} />
<Route path="/" element={<BurgerBuilder />} />
<Route path="/orders" element={<LazyOrders/>} />
<Route path="/logout" element={<Logout />} />
<Route path="/checkout/*" element={<LazyCheckout />}>
<Route path="contact-data" element={<ContactData />} />
</Route>
</Routes>
    </Suspense>

            </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoSignIn: () => dispatch(actionTypes.checkAuthentication()),
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
