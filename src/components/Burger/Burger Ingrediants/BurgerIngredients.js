import React, { Component } from "react";
import classes from "./BurgerIngredients.module.css";
import PropTypes from "prop-types"


class BurgerIngredients  extends Component {

   ingredients = null;
   render(){
     switch (this.props.type) {
            case "bread-bottom":
              this.ingredients = <div className={classes.BreadBottom}></div>;
              break;
            case "bread-top":
              this.ingredients = (
                <div className={classes.BreadTop}>
                  <div className={classes.Seeds1}></div>
                  <div className={classes.Seeds2}></div>
                </div>
              );
              break;
            case "meat":
              this.ingredients = <div className={classes.Meat}></div>;
              break;
            case "cheese":
              this.ingredients = <div className={classes.Cheese}></div>;
              break;

            case "salad":
              this.ingredients = <div className={classes.Salad}></div>;
              break;
            case "bacon":
              this.ingredients = <div className={classes.Bacon}></div>;
              break;
              default:
                this.ingredients= null
          }

          return this.ingredients;
   }

};

BurgerIngredients.propTypes={
type : PropTypes.string.isRequired
}

export default BurgerIngredients;
