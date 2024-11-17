import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import io from "socket.io-client";

export function Incomes() {
  const socket = io("ws://localhost:8000/incomes", {
    auth: { token: localStorage.token },
  });

  const [incomes, setIncomes] = useState<any[]>([]);
  useEffect(() => {
    socket.on("initial data", (data) => {
      setIncomes([...data]);
    });

    socket.on("incomes:append", (data) => {
      setIncomes((prevValue) => [...prevValue, data]);
    });

    socket.on("income:deleted", (id) => {
      setIncomes((prevIncomes) => prevIncomes.filter((i) => i.id !== id));
    });

    socket.on("income:updated", (data) => {
      setIncomes((prevIncomes) =>
        prevIncomes.map((i) =>
          i.id === data.id ? { ...i, ...data } : { ...i }
        )
      );
    });

    return function () {
      socket.disconnect();
    };
  }, []);

  const [income, setIncome] = useState({
    id: "",
    income_amount: "",
    income_type: "",
    income_description: "",
    income_date: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      if (income.id) {
        socket.emit("incomes:update", income);
      } else {
        socket.emit("incomes:add", income);
      }
      setShow(false);
    } catch (e) {
      alert("some error");
      console.log(e);
    }
  };

  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show} backdrop="static" onHide={() => setShow(false)}>
        <Modal.Header closeButton>Set Income</Modal.Header>
        <Modal.Body>
          <Form id="incomes-form" onSubmit={handleSubmit}>
            <Form.Label htmlFor="type">Income Type</Form.Label>
            <input type="hidden" value={income.id} />
            <Form.Control
              type="text"
              inputMode="text"
              id="type"
              value={income.income_type}
              onChange={(e) =>
                setIncome({ ...income, income_type: e.target.value })
              }
              required
            />
            <Form.Label htmlFor="amount">Income Amount</Form.Label>
            <Form.Control
              type="number"
              id="amount"
              value={income.income_amount}
              min={0}
              onChange={(e) =>
                setIncome({
                  ...income,
                  income_amount: e.target.value,
                })
              }
              required
            />
            <Form.Label htmlFor="description">Income Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              as={"textarea"}
              value={income.income_description}
              onChange={(e) =>
                setIncome({
                  ...income,
                  income_description: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="date">Income Date</Form.Label>
            <Form.Control
              type="date"
              id="date"
              value={income.income_date}
              onChange={(e) =>
                setIncome({
                  ...income,
                  income_date: e.target.value,
                })
              }
              required
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" form="incomes-form" type="submit">
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
          {incomes.map((in_) => {
            return (
              <tr key={in_.id}>
                <td>{in_.income_type || "No Income Type"}</td>
                <td>{in_.income_amount || "N/A"}</td>
                <td>{in_.income_description || "No Description"}</td>
                <td>{in_.income_date || "N/A"}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      setIncome({ ...in_ });
                      setShow(true);
                    }}
                  >
                    UPDATE
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => socket.emit("incomes:delete", in_.id)}
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
