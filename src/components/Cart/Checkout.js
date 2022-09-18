import useForm from "../../hooks/form-hook";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const textValidator = (val) => val.trim().length > 3;
  const postalValidator = (val) => val.trim().length === 5;

  //   Name Input
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetName,
  } = useForm(textValidator);
  //   Email Input
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useForm(textValidator);
  // Street   Input
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useForm(textValidator);
  //   PostalCode Input
  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    blurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useForm(postalValidator);
  //   City Input
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: resetCity,
  } = useForm(textValidator);

  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    streetIsValid &&
    cityIsValid &&
    postalIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("Form has error");
      return;
    }

    const collectedData = {
      name: nameValue,
      email: emailValue,
      street: streetValue,
      postalCode: postalValue,
      city: cityValue,
    };

    props.onCheckout(collectedData);
    console.log(collectedData);

    // Reset fields
    resetName();
    resetEmail();
    resetCity();
    resetStreet();
    resetPostal();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${emailHasError && classes.invalid}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p>Please enter a valid email</p>}
      </div>
      <div
        className={`${classes.control} ${streetHasError && classes.invalid}`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Plaese enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${postalHasError && classes.invalid}`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p>Please enter a valid postal code (5 digits)</p>}
      </div>
      <div className={`${classes.control} ${cityHasError && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.closeCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
