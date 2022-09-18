import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const openCartHandler = () => {
    setCartOpen(true);
  };

  const closeCartHandler = () => {
    setCartOpen(false);
  };
  return (
    <CartContextProvider>
      {cartOpen && <Cart onCartClose={closeCartHandler} />}
      <Header onCartOpen={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
