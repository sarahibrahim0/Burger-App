import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./Burger Ingrediants/BurgerIngredients";
import WithRouter from "../../hoc/WithRouter/WithRouter";
const Burger = (props) => {
  let newIng = props.ingredients
  console.log(newIng)
  // if(!props.ingredients){
    let transformedIngredients = Object.keys(newIng || {}).map(
      ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_,index)=>{
         return  <BurgerIngredients key={ingredient + index} type={ingredient}></BurgerIngredients>
        });
      }
    ).reduce((previousValue,currentValue)=>{
      return previousValue.concat(currentValue)
    },[]);

    if(transformedIngredients.length === 0){

      transformedIngredients= <p>Please Start Adding Ingredients</p>

    }

    //turning the ingrediants object it receives from builder to an array of ingrediants
    return (
      <div className={classes.Burger}>
        <BurgerIngredients type="bread-top"></BurgerIngredients>

        {transformedIngredients}

        <BurgerIngredients type="bread-bottom"></BurgerIngredients>
      </div>
    );
  // }

};

export default WithRouter(Burger);
