import React from "react";
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";
const BuildControls = (props)=>{

    const controls =
     [
    {label: "Salad",type: "salad" },
    {label: "Bacon",type: "bacon" },
    {label: "Cheese",type: "cheese" },
    {label: "Meat",type: "meat" },
    ]

    return(
    <div className={classes.BuildControls}>

<p>Current Price:<strong> {props.price.toFixed(2)}</strong></p>


{controls.map(control=>{
 return    <BuildControl
  remove={()=> props.ingredientsRemoved(control.type)}
  add={()=> props.ingredientsAdded(control.type)}
  key={control.label}
  label={control.label}
  disabled={props.disabled[control.type]}
  />
})}

<button onClick={props.purchaseHandler} disabled={!props.purchasable} className={classes.OrderButton}>Order Now</button>
    </div>
    );
}

export default BuildControls;