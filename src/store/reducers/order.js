import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, { id: action.id });

      return updateObject(state, {
        purchased: true,
        loading: false,
        orders: state.orders.concat(newOrder)});
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false      });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true });

    case actionTypes.PURCHASE_HANDLED:
      return updateObject(state, {
        purchased: false,
      });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false,
      });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {
        loading: true,
      });
    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, {
        loading: false,
      });
    default:
      return state;
  }
};

export default orderReducer;
