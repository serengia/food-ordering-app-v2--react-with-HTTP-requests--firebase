import React from "react";

import s from "./Input.module.css";

function Input(props) {
  return (
    <div className={`${s.input} ${props.className}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props}>{props.children}</input>
    </div>
  );
}

export default Input;
