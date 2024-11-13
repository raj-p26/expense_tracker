import "./jquery.js";

const $incomeType = $("#income-type");
const $incomeAmount = $("#income-amount");
const $incomeDescription = $("#income-description");
const $incomeDate = $("#income-date");

const socket = io("ws://localhost:8000/incomes", {
  auth: {
    // temporary auth token
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxNTEyODM3fQ.zjnMuUZyOMb5bYQhUdtZJF3RiRu-VmIETJWZf9kBRk8",
  },
});

$("#incomes-form").on("submit", async (event) => {
  event.preventDefault();

  const data = {
    income_type: $incomeType.val(),
    income_amount: $incomeAmount.val(),
    income_description: $incomeDescription.val(),
    income_date: $incomeDate.val(),
  };
});
