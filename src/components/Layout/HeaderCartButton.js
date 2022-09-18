import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import s from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [highlight, setHighlight] = useState(false);
  const cartCxt = useContext(CartContext);

  const quantity = cartCxt.items.reduce((initialNum, currValue) => {
    return initialNum + currValue.quantity;
  }, 0);

  const buttonClasses = `${s.button} ${highlight ? s.bump : ""}`;

  const { items } = cartCxt;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setHighlight(true);

    const timer = setTimeout(() => {
      setHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.openCart}>
      <span className={s.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={s.badge}>{quantity}</span>
    </button>
  );
};

export default HeaderCartButton;
