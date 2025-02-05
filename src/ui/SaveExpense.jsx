/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@components/Input.jsx";
import { Button } from "@components/Button.jsx";

export default function SaveExpense({
  onCancel = () => {},
  onSave = () => {},
  expense = {
    expense_id: -1,
    expense_amount: 0,
    expense_type: "",
    expense_description: "",
    expense_date: "",
  },
}) {
  const [newExpense, setNewExpense] = useState({ ...expense });
  const [errors, setErrors] = useState({
    expense_amount: "",
    expense_type: "",
    expense_date: "",
  });
  const [valid, setValid] = useState(false);

  const updateValue = ({ target }) => {
    let name = target.name;
    let value = target.value;

    if (!value && Object.keys(errors).includes(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Can not be blank",
      }));
      setValid(false);
    } else {
      setErrors({
        expense_amount: "",
        expense_type: "",
        expense_date: "",
      });
      setValid(true);
    }

    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (valid) {
      onSave({ ...newExpense });
    }
  };

  return (
    <>
      <Input
        label="Type:"
        name="expense_type"
        value={newExpense.expense_type}
        onChange={updateValue}
        errorMessage={errors.expense_type}
      />
      <Input
        label="Amount:"
        name="expense_amount"
        type="number"
        value={newExpense.expense_amount}
        onChange={updateValue}
        errorMessage={errors.expense_amount}
      />
      <Input
        label="Description:"
        name="expense_description"
        value={newExpense.expense_description}
        textarea
        onChange={updateValue}
        placeholder="(optional)"
      />
      <Input
        label="Date:"
        type="date"
        name="expense_date"
        value={newExpense.expense_date}
        onChange={updateValue}
        errorMessage={errors.expense_date}
      />
      <div className="w-fit ml-auto">
        <Button type="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="text" onClick={handleClick}>
          Save
        </Button>
      </div>
    </>
  );
}
