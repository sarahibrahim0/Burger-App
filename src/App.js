import "./App.css";
import Layout from "./hoc/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactData from "./containers/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/auth";
import { Component, lazy, Suspense } from "react";
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

 <Routes>
<Route path="/auth" Component={Auth} />
<Route path="/" Component={BurgerBuilder} />
<Route path="/orders" element={<Suspense fallback={<Spinner/>}><LazyOrders></LazyOrders></Suspense>} />
<Route path="/logout" Component={Logout} />
<Route path="/checkout/*" element={<Suspense fallback={<Spinner/>}><LazyCheckout></LazyCheckout></Suspense>}>
<Route path="contact-data" Component={ContactData} />
</Route>
</Routes>

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
