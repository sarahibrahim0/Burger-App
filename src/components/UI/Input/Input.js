import React from "react";
import classes from "./Input.module.css";


const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.inputElement];
  if (props.invalid && props.touched) {
    inputClasses.push(classes.invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={inputClasses.join(" ")}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
