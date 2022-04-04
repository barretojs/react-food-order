import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

type Props = {
  onAddToCart: (amount: number) => void;
};

const MealItemForm: React.VFC<Props> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHanlder: React.FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = parseInt(inputRef.current!.value);

    if (!enteredAmount || enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <Input
        label="Amount"
        input={{
          id: "amount",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
        ref={inputRef}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount! (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
