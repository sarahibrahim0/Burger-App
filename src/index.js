import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer  from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order"
import authReducer from  './store/reducers/auth'
import thunk from "redux-thunk";
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  burgerReducer: reducer,
  orderReducer: orderReducer,
  authReducer: authReducer
});
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devToolsEnhancer: true,
  devTools:  process.env.NODE_ENV !== 'production',
});


root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
