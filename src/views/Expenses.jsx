import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import SaveExpense from "@ui/SaveExpense";
import PlusIcon from "@assets/PlusIcon";
import ShowIcon from "@assets/ShowIcon";
import TrashIcon from "@assets/TrashIcon";
import UpdateIcon from "@assets/UpdateIcon";
import ListItem from "@components/ListItem";
import Confirm from "@components/Confirm";
import { WS_URL } from "../constants";

export function Expenses() {
  const navigate = useNavigate();
  const socket = useRef(null);
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateExepense, setUpdateExpense] = useState({
    id: -1,
    expense_amount: 0,
    expense_type: "",
    expense_description: "",
    expense_date: "",
  });

  useEffect(() => {
    socket.current = io(`${WS_URL}/expenses`, {
      auth: {
        token: localStorage.token,
      },
    });

    socket.current.on("initial data", (expenses) => {
      setExpenses([...expenses]);
    });

    socket.current.on("expenses:append", (expense) => {
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    });

    socket.current.on("expense:deleted", (id) => {
      setExpenses((prevExepnses) =>
        prevExepnses.filter((expense) => expense.id !== id),
      );
      setDeleteExpense(null);
    });

    socket.current.on("expense:updated", (updatedExpense) => {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id
            ? { ...updatedExpense }
            : { ...expense },
        ),
      );
    });

    return function () {
      socket.current.disconnect();
    };
  }, []);

  const resetUpdateExpense = () => {
    setUpdateExpense({
      id: -1,
      expense_amount: 0,
      expense_type: "",
      expense_description: "",
      expense_date: "",
    });
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onCancel={() => setShowModal(false)}
          title={updateExepense.id !== -1 ? "Update Expense" : "New Expense"}
          subtitle="Fill up details to save Expense"
        >
          <SaveExpense
            expense={updateExepense}
            onCancel={() => {
              setShowModal(false);
              resetUpdateExpense();
            }}
            onSave={(expense) => {
              if (expense.id === -1) {
                socket.current.emit("expenses:add", expense);
              } else {
                socket.current.emit("expenses:update", expense);
              }
              resetUpdateExpense();
              setShowModal(false);
            }}
          />
        </Modal>
      )}

      <Confirm
        show={showConfirm}
        title="Delete?"
        subtitle="Are you sure you want to delete this expense record?"
        onCancel={() => {
          setShowConfirm(false);
          setDeleteExpense(null);
        }}
        onConfirm={() => {
          socket.current.emit("expenses:delete", deleteExpense);
          setDeleteExpense(null);
          setShowConfirm(false);
        }}
      />

      <div className="max-w-[900px] mx-auto">
        {expenses.map((expense) => {
          return (
            <ListItem
              key={expense.id}
              title={expense.expense_type}
              supporting={expense.expense_amount}
            >
              <Button
                type="text"
                onClick={() => navigate(`/expenses/${expense.id}`)}
              >
                <span className="text-tertiary">
                  <ShowIcon />
                </span>
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setUpdateExpense({ ...expense });
                  setShowModal(true);
                }}
              >
                <UpdateIcon />
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setDeleteExpense(expense.id);
                  setShowConfirm(true);
                }}
              >
                <TrashIcon className="text-error" />
              </Button>
            </ListItem>
          );
        })}
      </div>
      <Button type="fab" onClick={() => setShowModal(true)}>
        <PlusIcon />
      </Button>
    </>
  );
}
