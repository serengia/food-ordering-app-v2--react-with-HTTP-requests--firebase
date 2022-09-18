import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import s from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCxt = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const totalAmount = `Ksh${cartCxt.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCxt.items.length > 0;

  const incrementItemHandler = (item) => {
    cartCxt.addItem({ ...item, quantity: 1 });
  };
  const decrementItemHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const onOrderHandler = () => {
    setIsCheckingOut(true);
  };

  const checkoutHandler = async (userData) => {
    const orderDetails = {
      user: userData,
      items: cartCxt,
    };

    try {
      await fetch(
        "https://react-simple-food-app-default-xyz.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(orderDetails),
          "Content-Type": "application/json",
        }
      );

      console.log("Order was successfully saved to db");
      setOrderSuccessful(true);

      // Clear cart
      cartCxt.clearCart();
    } catch (error) {
      console.log("There was an error");
    }

    // Send to database
  };

  const orderControls = (
    <div className={s.actions}>
      <button className={s["button--alt"]} onClick={props.onCartClose}>
        Close
      </button>
      {cartHasItems && (
        <button className={s.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal closeCart={props.onCartClose}>
      <ul className={s["cart-items"]}>
        {cartCxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={decrementItemHandler.bind(null, item.id)}
            onAdd={incrementItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={s.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderSuccessful && (
        <p>
          Your order was successfully processed. We will contact you shortly.
        </p>
      )}

      {orderSuccessful && (
        <div className={s.actions}>
          <button className={s.button} onClick={props.onCartClose}>
            Close
          </button>
        </div>
      )}

      {isCheckingOut && !orderSuccessful && (
        <Checkout closeCart={props.onCartClose} onCheckout={checkoutHandler} />
      )}

      {!isCheckingOut && orderControls}
    </Modal>
  );
}

export default Cart;
