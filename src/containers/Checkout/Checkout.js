import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import WithRouter from "../../hoc/WithRouter/WithRouter";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions/order'

class Checkout extends Component {


  CheckoutCancelledHandler = () => {
    this.props.navigate(-1);
  };

  CheckoutContinuedHandler = () => {
    this.props.navigate('/checkout/contact-data');
  };

  render() {
    let summary = <Navigate to="/" />;
    const purchaseRedirect = this.props.purchased? <Navigate to="/"/>:  null;

    if (this.props.ingredients) {
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCheckoutCancelled={this.CheckoutCancelledHandler}
            onCheckoutContinued={this.CheckoutContinuedHandler}
          />
          <Outlet />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    purchased: state.orderReducer.purchased

  };

};


const mapDispatchToProps= (dispatch)=>{

  return{
  purchaseHandled : ()=>{dispatch(actionTypes.purchaseHandled())}


  }

}
export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Checkout));
