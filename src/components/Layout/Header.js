import s from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={s.header}>
        <h1>Meals App</h1>
        <HeaderCartButton openCart={props.onCartOpen} />
      </header>
      <div className={s["main-image"]}>
        <img src={mealImg} alt="Table full of food." />
      </div>
    </>
  );
};

export default Header;
