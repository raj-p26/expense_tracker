import "./jquery.js";
import { USER_TOKEN } from "./app.js";

const $incomeID = $("#income-id");
const $incomeType = $("#income-type");
const $incomeAmount = $("#income-amount");
const $incomeDescription = $("#income-description");
const $incomeDate = $("#income-date");
const $incomesTable = $("#income-holder");

const socket = io("ws://localhost:8000/incomes", {
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
    $incomesTable.append(createRow(e));
  });
});

socket.on("incomes:append", (data) => {
  $incomesTable.append(createRow(data));
});

socket.on("income:deleted", (id) => {
  $(`tr[data-id="${id}"]`).remove();
});

socket.on("income:get", (income) => {
  $incomeType.val(income.income_type);
  $incomeAmount.val(income.income_amount);
  $incomeDate.val(income.income_date);
  $incomeDescription.val(income.income_description);

  $("#income-btn").text("Update");
  $("#add-income-modal").text("Update Income");
  $("#income-modal").modal("show");
});

socket.on("income:updated", (data) => {
  const $tr = $(`tr[data-id="${data.id}"]`);

  $tr.html(
    `
    <td>${data.income_type}</td>
    <td>${data.income_amount}</td>
    <td>${data.income_description || "No Description"}</td>
    <td>${data.income_date}</td>
    <td><button class="btn btn-info" id="update-income">UPDATE</button></td>
    <td><button class="btn btn-danger" id="delete-income">DELETE</button></td>
    `
  );
});

const createRow = (data) => {
  const $row = $("<tr>")
    .append(
      `
    <td>${data.income_type}</td>
    <td>${data.income_amount}</td>
    <td>${data.income_description || "No Description"}</td>
    <td>${data.income_date}</td>
    <td><button class="btn btn-info" id="update-income">UPDATE</button></td>
    <td><button class="btn btn-danger" id="delete-income">DELETE</button></td>
  `
    )
    .attr("data-id", data.id);
  return $row;
};

$incomesTable.on("click", "#delete-income", (e) => {
  const tr = $(e.target).closest("tr");
  const ID = tr.attr("data-id");

  socket.emit("incomes:delete", ID);
});

$incomesTable.on("click", "#update-income", (e) => {
  const tr = $(e.target).closest("tr");
  const ID = tr.attr("data-id");
  $incomeID.val(ID);

  socket.emit("incomes:get", ID);
});

$("#incomes-form").on("submit", async (event) => {
  event.preventDefault();

  const data = {
    income_type: $incomeType.val(),
    income_amount: $incomeAmount.val(),
    income_description: $incomeDescription.val(),
    income_date: $incomeDate.val(),
  };

  if ($incomeID.val()) {
    socket.emit("incomes:update", { ...data, id: $incomeID.val() });
  } else {
    socket.emit("incomes:add", data);
  }

  $("#income-modal").modal("hide");
});

$("#income-modal").on("hide.bs.modal", () => {
  $incomeID.val("");
  $incomeType.val("");
  $incomeAmount.val("");
  $incomeDescription.val("");
  $incomeDate.val("");
});
