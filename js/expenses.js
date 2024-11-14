import "./jquery.js";
import { USER_TOKEN } from "./app.js";

const $expenseID = $("#expense-id");
const $expenseType = $("#expense-type");
const $expenseAmount = $("#expense-amount");
const $expenseDescription = $("#expense-description");
const $expenseDate = $("#expense-date");
const $expensesTable = $("#expense-holder");

const socket = io("ws://localhost:8000/expenses", {
  auth: {
    token: USER_TOKEN,
  },
});

socket.on("error", (reason) => {
  alert("Socket error");
  console.log(reason);
});

socket.on("initial data", (data) => {
  data.forEach((e) => {
    $expensesTable.append(createRow(e));
  });
});

socket.on("expenses:append", (data) => {
  $expensesTable.append(createRow(data));
});

socket.on("expense:deleted", (id) => {
  $(`tr[data-id="${id}"]`).remove();
});

socket.on("expense:get", (expense) => {
  $expenseType.val(expense.expense_type);
  $expenseAmount.val(expense.expense_amount);
  $expenseDate.val(expense.expense_date);
  $expenseDescription.val(expense.expense_description);

  $("#expense-btn").text("Update");
  $("#add-expense-modal").text("Update Expense");
  $("#expense-modal").modal("show");
});

socket.on("expense:updated", (data) => {
  const $tr = $(`tr[data-id="${data.id}"]`);

  $tr.html(
    `
    <td>${data.expense_type}</td>
    <td>${data.expense_amount}</td>
    <td>${data.expense_description || "No Description"}</td>
    <td>${data.expense_date}</td>
    <td><button class="btn btn-info" id="update-expense">UPDATE</button></td>
    <td><button class="btn btn-danger" id="delete-expense">DELETE</button></td>
    `
  );
});

const createRow = (data) => {
  const $row = $("<tr>")
    .append(
      `
    <td>${data.expense_type}</td>
    <td>${data.expense_amount}</td>
    <td>${data.expense_description || "No Description"}</td>
    <td>${data.expense_date}</td>
    <td><button class="btn btn-info" id="update-expense">UPDATE</button></td>
    <td><button class="btn btn-danger" id="delete-expense">DELETE</button></td>
  `
    )
    .attr("data-id", data.id);
  return $row;
};

$expensesTable.on("click", "#delete-expense", (e) => {
  const tr = $(e.target).closest("tr");
  const ID = tr.attr("data-id");

  socket.emit("expenses:delete", ID);
});

$expensesTable.on("click", "#update-expense", (e) => {
  const tr = $(e.target).closest("tr");
  const ID = tr.attr("data-id");
  $expenseID.val(ID);

  socket.emit("expenses:get", ID);
});

$("#expenses-form").on("submit", async (event) => {
  event.preventDefault();

  const data = {
    expense_type: $expenseType.val(),
    expense_amount: $expenseAmount.val(),
    expense_description: $expenseDescription.val(),
    expense_date: $expenseDate.val(),
  };

  if ($expenseID.val()) {
    socket.emit("expenses:update", { ...data, id: $expenseID.val() });
  } else {
    socket.emit("expenses:add", data);
  }

  $("#expense-modal").modal("hide");
});

$("#expense-modal").on("hide.bs.modal", () => {
  $expenseID.val("");
  $expenseType.val("");
  $expenseAmount.val("");
  $expenseDescription.val("");
  $expenseDate.val("");
});
