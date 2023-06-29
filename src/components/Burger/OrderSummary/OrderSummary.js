import React, { Component } from "react";
import ReactAux from "../../../hoc/ReactAux/ReactAux";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (ingredient) => {
        return (
          <li key={ingredient + "A"}>
            <span style={{ textTransform: "capitalize" }}>
              {" "}
              {ingredient}: {this.props.ingredients[ingredient]}{" "}
            </span>
          </li>
        );
      }
    );
    return (
      <ReactAux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>do you want to checkout?</p>

        <Button btnType="Success" clicked={this.props.continue}>
          {" "}
          Continue{" "}
        </Button>
        <Button btnType="Danger" clicked={this.props.modalClosed}>
          Cancel
        </Button>
      </ReactAux>
    );
  }
}

export default OrderSummary;
