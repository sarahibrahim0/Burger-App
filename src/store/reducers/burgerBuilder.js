import { act } from "react-dom/test-utils";
import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
  totalPrice: 4,
  purchasable: 0,
  error: false,
  building: false
};
const INGREDIANT_PRICES = { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 };

const addIngredients = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIng);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientss = updateObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedStatee = {
    ingredients: updatedIngredientss,
    totalPrice: state.totalPrice - INGREDIANT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedStatee);
};

const setIngredients = (state, action) => {
  const updatedProps = {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4,
    building: true
  };
  return updateObject(state, updatedProps);
};

const setError = (state, action) => {
  const updatedError = {
    error: true,
  };
  return updateObject(state, updatedError);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredients(state, action);

    case actionTypes.SET_ERROR:
      return setError(state, action);

    case actionTypes.SET_INGREDIENT:
      return setIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
