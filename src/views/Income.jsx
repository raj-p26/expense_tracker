import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@components/Button";
import LeftArrow from "@assets/LeftArrow";
import Card from "@components/Card";
import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";

export default function Income() {
  const navigate = useNavigate();
  const params = useParams();
  const [income, setIncome] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${SERVER_URL}/incomes/${params.id}`, {
        headers: {
          authorization: localStorage.token,
        },
      });
      const body = await response.json();
      setIncome({ ...body });
      setLoading(false);
    })();
  }, [params, setIncome]);

  if (loading) return <Loading />;
  return (
    <>
      <Button type="text" onClick={() => navigate(-1)}>
        <LeftArrow className="size-10" />
      </Button>
      <Card title="Income Info">
        <p>Income Type: {income.income_type}</p>
        <p>Income Amount: {income.income_amount}</p>
        <p>
          Income Description: {income.income_description || "No Description"}
        </p>
        <p>Income Date: {income.income_date}</p>
      </Card>
    </>
  );
}
