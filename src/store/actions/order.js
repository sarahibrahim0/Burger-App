import * as actionTypes from "./actionsTypes";
import instance from "../../axios/axios";

export const PURCHASE_BURGER_SUCCESS = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const PURCHASE_BURGER_FAIL = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

 const PURCHASE_BURGER_START = () => {
    return {
      type: actionTypes.PURCHASE_BURGER_START,
    };
  };



  const FETCH_ORDER_FAIL = (error) => {
    return {
      type: actionTypes.FETCH_ORDER_FAIL,
      error: error
    };
  };

  const FETCH_ORDER_SUCCESS = (orders) => {
    return {
      type: actionTypes.FETCH_ORDER_SUCCESS,
      orders: orders,
    };
  };






export const purchaseStart = (orderData , token ) => {

    return (dispatch)=> {
        dispatch(PURCHASE_BURGER_START());
        instance.post("/orders.json?auth=" + token, orderData)
        .then((response) => {
          dispatch(PURCHASE_BURGER_SUCCESS(response.data, orderData));
          console.log(orderData)
        })
        .catch((error) => {
            dispatch(PURCHASE_BURGER_FAIL(error))
        });

   };
  };


  export const purchaseHandled = () => {

    return {
type: actionTypes.PURCHASE_HANDLED
    }
  };

  export const fetchOrdersStart = () => {
    return {
      type: actionTypes.FETCH_ORDERS_START,
    };
  };

  export const setOrdersInit = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        instance.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(FETCH_ORDER_SUCCESS(fetchedOrders));
            } )
            .catch( err => {
                dispatch(FETCH_ORDER_FAIL(err));
            } );
    };
};