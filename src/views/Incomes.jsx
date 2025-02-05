import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import SaveIncome from "@ui/SaveIncome";
import PlusIcon from "@assets/PlusIcon";
import ShowIcon from "@assets/ShowIcon";
import TrashIcon from "@assets/TrashIcon";
import UpdateIcon from "@assets/UpdateIcon";
import ListItem from "@components/ListItem";
import Confirm from "@components/Confirm";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { WS_URL } from "../constants";

export function Incomes() {
  const navigate = useNavigate();
  const socket = useRef(null);
  const [deleteIncome, setDeleteIncome] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateIncome, setUpdateIncome] = useState({
    id: -1,
    income_amount: 0,
    income_type: "",
    income_description: "",
    income_date: "",
  });

  useEffect(() => {
    socket.current = io(`${WS_URL}/incomes`, {
      auth: {
        token: localStorage.token,
      },
    });

    socket.current.on("initial data", (incomes) => {
      setIncomes([...incomes]);
    });

    socket.current.on("incomes:append", (income) => {
      setIncomes((prevIncomes) => [...prevIncomes, income]);
    });

    socket.current.on("income:deleted", (id) => {
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== id),
      );
      setDeleteIncome(null);
    });

    socket.current.on("income:updated", (updatedIncome) => {
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income.id === updatedIncome.id ? { ...updatedIncome } : { ...income },
        ),
      );
    });

    return function () {
      socket.current.disconnect();
    };
  }, []);

  const resetUpdateIncome = () => {
    setUpdateIncome({
      id: -1,
      income_amount: 0,
      income_type: "",
      income_description: "",
      income_date: "",
    });
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onCancel={() => setShowModal(false)}
          title={updateIncome.id !== -1 ? "Update Income" : "New Income"}
          subtitle="Fill up details to save Income"
        >
          <SaveIncome
            income={updateIncome}
            onCancel={() => {
              setShowModal(false);
              resetUpdateIncome();
            }}
            onSave={(income) => {
              if (income.id === -1) {
                socket.current.emit("incomes:add", income);
              } else {
                socket.current.emit("incomes:update", income);
              }
              resetUpdateIncome();
              setShowModal(false);
            }}
          />
        </Modal>
      )}

      <Confirm
        show={showConfirm}
        title="Delete?"
        subtitle="Are you sure you want to delete this income record?"
        onCancel={() => {
          setShowConfirm(false);
          setDeleteIncome(null);
        }}
        onConfirm={() => {
          socket.current.emit("incomes:delete", deleteIncome);
          setDeleteIncome(null);
          setShowConfirm(false);
        }}
      />

      <div className="max-w-[900px] mx-auto">
        {incomes.map((income) => {
          return (
            <ListItem
              key={income.id}
              title={income.income_type}
              supporting={income.income_amount}
            >
              <Button
                type="text"
                onClick={() => navigate(`/incomes/${income.id}`)}
              >
                <span className="text-tertiary">
                  <ShowIcon />
                </span>
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setUpdateIncome({ ...income });
                  setShowModal(true);
                }}
              >
                <UpdateIcon />
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setDeleteIncome(income.id);
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
