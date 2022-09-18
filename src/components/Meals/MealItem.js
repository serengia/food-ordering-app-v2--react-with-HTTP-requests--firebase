import React, { useContext } from "react";
import s from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

function MealItem(props) {
  const cartCxt = useContext(CartContext);

  const { name, description, price, id } = props.meal;
  const formatedPrice = price.toFixed(2);

  const addQuantityHandler = (quantity) => {
    cartCxt.addItem({
      name: name,
      id: id,
      price: price,
      quantity: quantity,
    });
  };

  return (
    <li className={s.meal}>
      <div>
        <h3>{name}</h3>
        <p className={s.description}>{description}</p>
        <span className={s.price}>{formatedPrice}</span>
      </div>
      <div className="">
        <MealItemForm id={id} addQuantity={addQuantityHandler} />
      </div>
    </li>
  );
}

export default MealItem;
