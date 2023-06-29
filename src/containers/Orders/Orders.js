import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import instance from '../../axios/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions/order";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as action from '../../store/actions/auth';
class Orders extends Component {


    componentDidMount() {
        console.log(this.props.userId)
this.props.autoSignIn()
setTimeout(()=>{ this.props.fetchOrders(this.props.token, this.props.userId);
    console.log(this.props.userId)

}, 100)
    }

    render () {
        let orders =  <Spinner/> ;
        if(!this.props.loading){
            orders= this.props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                totalPrice={order.totalPrice} />
        ))}
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
return{
orders: state.orderReducer.orders,
loading: state.orderReducer.loading,
token: state.authReducer.token,
userId: state.authReducer.userId
}
}

const mapDispatchToProps= (dispatch)=>{

    return{
    fetchOrders : (token, userId)=>dispatch(actionTypes.setOrdersInit(token, userId)),
    autoSignIn: ()=> dispatch(action.checkAuthentication()),


    }

}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, instance));