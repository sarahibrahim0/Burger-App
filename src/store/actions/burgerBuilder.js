
import instance from "../../axios/axios";
import * as actionTypes from "../actions/actionsTypes";

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};
export const fetchingFailed = (  ) => {
    return {
        type: actionTypes.SET_ERROR,

    };
};
export const setIngredients = (ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}
export const initIngredients = ()=>{
    return (dispatch)=>{
        console.log('hi')

        instance
        .get(
          "https://burger-app-2f9fa-default-rtdb.firebaseio.com/ingredients.json"
        )
        .then((response) => {

          dispatch(setIngredients(response.data));
        })
        .catch((error) => {
         dispatch(fetchingFailed())
        });

    }}