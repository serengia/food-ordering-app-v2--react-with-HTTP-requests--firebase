import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Used concat instead of push to avoid mutating the state object
    const updatedTotalAmount =
      state.totalAmount + action.item.quantity * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };

      updatedItems = [...state.items];

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const totalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //There is more than 1 item
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return initialCartState;
  }

  return initialCartState;
};

function CartContextProvider(props) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    cartDispatch({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
