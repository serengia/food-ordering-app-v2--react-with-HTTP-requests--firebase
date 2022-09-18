import React, { useEffect, useState } from "react";
import Input from "../UI/Input";

import s from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [quantity, setQuantity] = useState(1);
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const quantityChangeHandler = (e) => {
    setQuantity(+e.target.value);
  };

  const submitQuantityHandler = (e) => {
    e.preventDefault();

    if (quantity < 1 || quantity > 5) {
      setQuantityIsValid(false);
      return;
    }

    props.addQuantity(quantity);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuantityIsValid(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [quantityIsValid]);

  return (
    <form className={s.form} onSubmit={submitQuantityHandler}>
      <Input
        type="number"
        id={props.id}
        min="1"
        step="1"
        value={quantity}
        label="Amount"
        onChange={quantityChangeHandler}
      />

      <button type="submit">+ Add</button>
      {!quantityIsValid && (
        <p className={s["error-text"]}>Quantity must be {`(> 0 and < = 5)`}</p>
      )}
    </form>
  );
}

export default MealItemForm;
