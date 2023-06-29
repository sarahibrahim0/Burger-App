import React from 'react'
import Burger from "../../Burger/Burger"
import Button from  "../../UI/Button/Button"
import  classes from "./CheckoutSummary.module.css"
import WithRouter from '../../../hoc/WithRouter/WithRouter';
import { connect } from 'react-redux';
/**
* @author
* @function CheckoutSummary
**/

const CheckoutSummary = (props) => {


  return(
    <div className={classes.CheckoutSummary}>
   <h1>I Hope It Tastes Well !</h1>
    <div style={{width: '100%', margin:'auto'} }><Burger ingredients={props.ingredients}/></div>
 <Button btnType="Danger" clicked={props.onCheckoutCancelled}>Cancel</Button>
 <Button btnType="Success" clicked={props.onCheckoutContinued}>Continue</Button>
    </div>

   )

 }
 const mapStateToProps = (state)=>{
  return{
    ingredients: state.burgerReducer.ingredients,
    totalPrice : state.burgerReducer.totalPrice
  }
 }

 export default connect(mapStateToProps)( WithRouter(CheckoutSummary));