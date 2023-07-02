import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("userId")

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, 3600000);
  };
};


export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbOYb4wkMhNFM1at9xp1wfeJ8ECRhzFy8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbOYb4wkMhNFM1at9xp1wfeJ8ECRhzFy8";
    }
    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const pathRedirect = (path)=>{
  return {
    type: actionTypes.SET_AUTH_PATH,
    path: path
  }
}

export const checkAuthentication = ()=>{
  return dispatch =>{
    const token = localStorage.getItem("token");
    if(!token){
      dispatch(logOut());
    }else{
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if(expirationDate <= new Date()){
        dispatch(logOut())
      }else{
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
      }
    }
  }
}