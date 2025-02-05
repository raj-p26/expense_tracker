/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@components/Input.jsx";
import { Button } from "@components/Button.jsx";

export default function SaveIncome({
  onCancel = () => {},
  onSave = () => {},
  income = {},
}) {
  const [newIncome, setNewIncome] = useState({ ...income });
  const [errors, setErrors] = useState({
    income_amount: "",
    income_type: "",
    income_date: "",
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
        income_amount: "",
        income_type: "",
        income_date: "",
      });
      setValid(true);
    }

    setNewIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (valid) {
      onSave({ ...newIncome });
    }
  };

  return (
    <>
      <Input
        label="Type:"
        name="income_type"
        value={newIncome.income_type}
        onChange={updateValue}
        errorMessage={errors.income_type}
      />
      <Input
        label="Amount:"
        name="income_amount"
        type="number"
        value={newIncome.income_amount}
        onChange={updateValue}
        errorMessage={errors.income_amount}
      />
      <Input
        label="Description:"
        name="income_description"
        value={newIncome.income_description}
        textarea
        onChange={updateValue}
        placeholder="(optional)"
      />
      <Input
        label="Date:"
        type="date"
        name="income_date"
        value={newIncome.income_date}
        onChange={updateValue}
        errorMessage={errors.income_date}
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
