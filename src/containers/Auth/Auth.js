
import classes from './Auth.module.css'
import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { Navigate, Outlet } from "react-router";
import WithRouter from "../../hoc/WithRouter/WithRouter";
import instance from "../../axios/axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import {  connect } from "react-redux";
import * as actionTypes from "../../store/actions/auth"

class Auth extends Component {
  state = {
    controls: {
        email: {
                    elementType: "input",
                    elementConfig: { type: "email", placeholder: "Email Address" },
                    value: "",
                    validation: { required: true, isEmail: true},
                    valid: false,
                    touched: false
                  },
                  password: {
                    elementType: "input",
                    elementConfig: { type: "Password", placeholder: "Password" },
                    value: "",
                    validation: { required: true, minLength:6 },
                    valid: false,
                    touched: false
                  },
    },

    isSigned: true
  };

  componentDidMount(){
    if(!this.props.isBuilding && this.props.path !== '/'){
      this.props.onSetAuthPath('/')
    }
  }
  switchSignMode = ()=>{
    this.setState((prevState)=>{
     return {isSigned : !prevState.isSigned}
    })
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName] : {...this.state.controls[controlName],value: event.target.value,
         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true}
    };
    const clonedElement = {
      ...updatedControls[controlName],
    };

    // let formIsValid = true;
    // for(let element in updatedControls){
    //   formIsValid = updatedControls[element].valid && formIsValid;
    // }
    this.setState({ controls: updatedControls });

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

  submitHandler =(event)=>{
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSigned)
  }
  render() {
    let fromArray = [];

    for (let key in this.state.controls) {
      fromArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
        {fromArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.inputChangedHandler(event, element.id)}
            invalid={!element.config.valid}
            touched={element.config.touched}
          />
        ))}
        <Button btnType="Success" >ORDER</Button>

      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;

    if(this.props.error){
      errorMsg = <p>{this.props.error}</p>
    }

    let authREd = null;
    if(this.props.isAuthenticated){
      authREd = (<Navigate to={this.props.path}/>);
    }
    return (
      <div className={classes.ContactData}>
        {authREd}
        {errorMsg}
        {form}
        <Button clicked={this.switchSignMode} btnType="Danger"  >{this.state.isSigned? 'SWITCH TO SIGN IN': 'SIGN UP' }</Button>

      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    token : state.authReducer.token,
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated : state.authReducer.token !== null,
    isBuilding: state.burgerReducer.building,
    path: state.authReducer.authPath
  }
}

const mapsDispatchToProps = (dispatch)=>{
  return{
onAuth : (email, password, isSigned)=>{dispatch(actionTypes.auth(email, password, isSigned))},
onSetAuthPath : (path)=>{dispatch(actionTypes.pathRedirect(path))}
  }
}

export default connect(mapStateToProps, mapsDispatchToProps) (WithRouter(withErrorHandler(Auth,instance )));
