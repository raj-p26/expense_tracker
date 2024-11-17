import { useState, useEffect, useRef } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import io, { Socket } from "socket.io-client";

export function Expenses() {
  const socket = useRef<Socket | null>(null);
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8000/expenses", {
      auth: { token: localStorage.token },
    });

    socket.current.on("initial data", (data: any) => {
      setExpenses([...data]);
    });

    socket.current.on("expenses:append", (data: any) => {
      setExpenses((prevValue) => [...prevValue, data]);
    });

    socket.current.on("expense:deleted", (id: any) => {
      setExpenses((prevexpenses) => prevexpenses.filter((i) => i.id !== id));
    });

    socket.current.on("expense:updated", (data: any) => {
      setExpenses((prevexpenses) =>
        prevexpenses.map((i) => (i.id === data.id ? { ...data } : { ...i }))
      );
    });

    return function () {
      socket.current?.disconnect();
    };
  }, []);

  const [expense, setExpense] = useState({
    id: "",
    expense_amount: "",
    expense_type: "",
    expense_description: "",
    expense_date: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      if (expense.id) {
        socket.current?.emit("expenses:update", expense);
      } else {
        socket.current?.emit("expenses:add", expense);
      }
      setShow(false);
    } catch (e) {
      alert("some error");
      console.log(e);
    }
  };

  const [show, setShow] = useState(false);
  const hide = () => {
    setShow(false);

    setExpense({
      id: "",
      expense_amount: "",
      expense_type: "",
      expense_description: "",
      expense_date: "",
    });
  };
  return (
    <>
      <Modal show={show} backdrop="static" onHide={hide}>
        <Modal.Header closeButton>Set Expense</Modal.Header>
        <Modal.Body>
          <Form id="expenses-form" onSubmit={handleSubmit}>
            <Form.Label htmlFor="type">Expense Type</Form.Label>
            <input type="hidden" value={expense.id} />
            <Form.Control
              type="text"
              inputMode="text"
              id="type"
              value={expense.expense_type}
              onChange={(e) =>
                setExpense({ ...expense, expense_type: e.target.value })
              }
              required
            />
            <Form.Label htmlFor="amount">Expense Amount</Form.Label>
            <Form.Control
              type="number"
              id="amount"
              value={expense.expense_amount}
              min={0}
              onChange={(e) =>
                setExpense({
                  ...expense,
                  expense_amount: e.target.value,
                })
              }
              required
            />
            <Form.Label htmlFor="description">Expense Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              as={"textarea"}
              value={expense.expense_description}
              onChange={(e) =>
                setExpense({
                  ...expense,
                  expense_description: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="date">Expense Date</Form.Label>
            <Form.Control
              type="date"
              id="date"
              value={expense.expense_date}
              onChange={(e) =>
                setExpense({
                  ...expense,
                  expense_date: e.target.value,
                })
              }
              required
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" form="expenses-form" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((in_) => {
            return (
              <tr key={in_.id}>
                <td>{in_.expense_type || "No Expense Type"}</td>
                <td>{in_.expense_amount || "N/A"}</td>
                <td>{in_.expense_description || "No Description"}</td>
                <td>{in_.expense_date || "N/A"}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      setExpense({ ...in_ });
                      setShow(true);
                    }}
                  >
                    UPDATE
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      socket.current?.emit("expenses:delete", in_.id)
                    }
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="add-btn" onClick={() => setShow(true)}>
        <Button variant="primary" className="rounded-circle shadow">
          <i className="bi bi-plus fs-2"></i>
        </Button>
      </div>
    </>
  );
}
