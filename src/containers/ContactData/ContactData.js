import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../components/UI/Button/Button";
import { Outlet } from "react-router";
import WithRouter from "../../hoc/WithRouter/WithRouter";
import instance from "../../axios/axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import {  connect } from "react-redux";
import * as actionTypes from "../../store/actions/order"

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Name" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Email" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zip Code" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
    },
    formIsValid: false,
    purchasing: true,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: this.state.name,
        email: this.state.email,
        street: this.state.street,
        postalCode: this.state.postalCode,
      },
      userId:this.props.userId
    };

    this.props.purchaseStart(order, this.props.token);

  };


  handleChange = (event, inputIdentifier) => {
    const clonedState = {
      ...this.state.orderForm,
    };
    const clonedElement = {
      ...clonedState[inputIdentifier],
    };
    clonedElement.value = event.target.value;
    console.log(clonedElement);
    clonedElement.valid = this.checkValidity(
      clonedElement.value,
      clonedElement.validation
    );
    clonedElement.touched = true;
    clonedState[inputIdentifier] = clonedElement;
    let formIsValid = true;
    for(let element in clonedState){
      formIsValid = clonedState[element].valid && formIsValid;
    }
    this.setState({ orderForm: clonedState, formIsValid: formIsValid });

  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  render() {
    let fromArray = [];

    for (let key in this.state.orderForm) {
      fromArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {fromArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.handleChange(event, element.id)}
            invalid={!element.config.valid}
            touched={element.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    token:state.authReducer.token,
    userId : state.authReducer.userId
  }
}


  const mapDispatchToProps= (dispatch)=>{

      return{
      purchaseStart : (orderData, token)=>{dispatch(actionTypes.purchaseStart(orderData, token))},
      purchaseHandled : ()=>{dispatch(actionTypes.purchaseHandled())}


      }

  }
export default connect(mapStateToProps, mapDispatchToProps) (WithRouter(withErrorHandler(ContactData,instance )));
