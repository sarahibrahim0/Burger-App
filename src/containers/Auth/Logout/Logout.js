import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/auth'
/**
* @author
* @class Logout
**/

class Logout extends Component {

 componentDidMount (){
    this.props.onLogout();
 }
 render() {
  return(
   <Navigate to='/'/>
    )
   }
 }


const mapDispatchToProps = (dispatch)=>{
    return{
   onLogout : ()=>dispatch(actionTypes.logOut())
    }
}
export default connect(null, mapDispatchToProps) (Logout);