import React from "react";
import ReactAux from "../../../hoc/ReactAux";
import Button from "../../UI/Button/Button";
const OrderSummary = (props)=>{

    const ingredientsSummary = Object.keys(props.ingredients).map(ingredient=>{
     return   <li key={ingredient+"A"}><span style={{textTransform:'capitalize'}}> {ingredient}: {props.ingredients[ingredient]} </span></li>
    })
    return (
        <ReactAux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
        {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>do you want to checkout?</p>

         <Button btnType="Success" clicked={props.continue}> Continue </Button>
        <Button btnType="Danger" clicked={props.modalClosed}>Cancel</Button>
        </ReactAux>
    );
}

export default OrderSummary;