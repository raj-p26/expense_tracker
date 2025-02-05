import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@components/Button";
import LeftArrow from "@assets/LeftArrow";
import Card from "@components/Card";
import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";

export default function Expense() {
  const navigate = useNavigate();
  const params = useParams();
  const [expense, setExpense] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${SERVER_URL}/expenses/${params.id}`, {
        headers: {
          authorization: localStorage.token,
        },
      });
      const body = await response.json();
      setExpense({ ...body });
      setLoading(false);
    })();
  }, [params, setExpense]);

  if (loading) return <Loading />;
  return (
    <>
      <Button type="text" onClick={() => navigate(-1)}>
        <LeftArrow className="size-10" />
      </Button>
      <Card title="Expense Info">
        <p>Expense Type: {expense.expense_type}</p>
        <p>Expense Amount: {expense.expense_amount}</p>
        <p>
          Expense Description: {expense.expense_description || "No Description"}
        </p>
        <p>Expense Date: {expense.expense_date}</p>
      </Card>
    </>
  );
}
