import { useEffect, useState } from "react";
import Card from "@components/Card";
import Loading from "@components/Loading";
import { SERVER_URL } from "../constants";

export default function Dashboard() {
  const [incomeStats, setIncomeStats] = useState({});
  const [expenseStats, setExpenseStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.token) return;
    (async function () {
      let res = await fetch(`${SERVER_URL}/stats/incomes`, {
        headers: {
          authorization: localStorage.token,
        },
      });
      let body = await res.json();
      setIncomeStats({ ...body });

      res = await fetch(`${SERVER_URL}/stats/expenses`, {
        headers: {
          authorization: localStorage.token,
        },
      });
      body = await res.json();
      setExpenseStats({ ...body });
      setLoading(false);
    })();
  }, [setIncomeStats, setExpenseStats, setLoading]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col gap-2">
        <Card title="Total Income">{incomeStats.total_income}</Card>
        <Card title="Average Income">{incomeStats.avg_income}</Card>
        <Card title="Total Expense">{expenseStats.total_expense}</Card>
        <Card title="Average Expense">{expenseStats.avg_expense}</Card>
        <Card title="Total Balance">
          {incomeStats.total_income - expenseStats.total_expense}
        </Card>
      </div>
    </>
  );
}
