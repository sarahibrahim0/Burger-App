import React, { Component } from "react";
import ReactAux from "../../hoc/ReactAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIANT_PRICES = { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 };
class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };


  purchaseContinueHandler=()=>{
    alert('3om w etm5tar');
  }

purchaseCancelHandler=()=>{
  this.setState({purchasing: false})
}
purchaseHandler = ()=>{
  this.setState({purchasing: true});
}


  updatePurchaseState = (updatedingredients) => {
    const ingredients = updatedingredients;
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((previousEle, currentEle) => {
        return previousEle + currentEle;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount !== 0) {
      const updatedCounted = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCounted;
      const priceAddition = INGREDIANT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngredients);
    } else {
      return;
    }
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <ReactAux>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          <OrderSummary price={this.state.totalPrice} continue={this.purchaseContinueHandler} modalClosed={this.purchaseCancelHandler} ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchaseHandler={this.purchaseHandler}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </ReactAux>
    );
  }
}

export default BurgerBuilder;
