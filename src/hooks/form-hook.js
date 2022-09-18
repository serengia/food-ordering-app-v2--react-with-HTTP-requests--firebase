import { useState } from "react";

function useForm(validateValue) {
  const [value, setValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const isValid = validateValue(value);

  const hasError = inputTouched && !isValid;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const blurHandler = () => {
    setInputTouched(true);
  };

  const reset = () => {
    setValue("");
    setInputTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    valueChangeHandler,
    blurHandler,
    reset,
  };
}

export default useForm;
