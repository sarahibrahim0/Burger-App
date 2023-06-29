import React, { Component } from "react";
import ReactAux from "../../hoc/ReactAux/ReactAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import WithRouter from "../../hoc/WithRouter/WithRouter";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/burgerBuilder";
import * as actionCreators from "../../store/actions/order"
import * as authActions from "../../store/actions/auth"
import instance from "../../axios/axios";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,

  };

  componentDidMount() {
  this.props.onSettingIngredients()


  }

  purchaseContinueHandler = () => {
    this.props.purchaseHandled()
    this.props.navigate("/checkout");
  };

  updatePurchaseState = (updatedingredients) => {
    const ingredients = updatedingredients;
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((previousEle, currentEle) => {
        return previousEle + currentEle;
      }, 0);

    return sum > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCounted = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCounted;
  //   const priceAddition = INGREDIANT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount !== 0) {
  //     const updatedCounted = oldCount - 1;
  //     const updatedIngredients = { ...this.state.ingredients };
  //     updatedIngredients[type] = updatedCounted;
  //     const priceAddition = INGREDIANT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceAddition;
  //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //     this.updatePurchaseState(updatedIngredients);
  //   } else {
  //     return;
  //   }
  // };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseHandler = () => {
    if(this.props.isAuthenticated)
{    this.setState({ purchasing: true});
}else{
  this.props.onSetRedirectPath('/checkout')
  this.props.navigate('/auth')
}
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
  };
  for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null;
  let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if ( this.props.ingredients ) {
   burger = (
        <ReactAux>
          {/* {        console.log(this.state.ingredients) */}
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            purchaseHandler={this.purchaseHandler}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            price={this.props.totalPrice}
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            disabled={disabledInfo }
            isAuthenticated= {this.props.isAuthenticated}
          />
        </ReactAux>
      );
    orderSummary =
    <OrderSummary
    price={this.props.totalPrice}
    continue={this.purchaseContinueHandler}
    modalClosed={this.purchaseCancelHandler}
    ingredients={this.props.ingredients}
  />
}

    return (
      <ReactAux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </ReactAux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
    removeIngredientHandler: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
      onSettingIngredients: () => dispatch(actionTypes.initIngredients()),
      purchaseHandled : ()=>{dispatch(actionCreators.purchaseHandled())},
      onSetRedirectPath : (path)=> dispatch(authActions.pathRedirect(path))

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithRouter(withErrorHandler(BurgerBuilder, instance)));

