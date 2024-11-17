import { Button } from "react-bootstrap";

export function Expenses() {
  return (
    <>
      <div className="add-btn">
        <Button variant="primary" className="rounded-circle shadow">
          <i className="bi bi-plus fs-2"></i>
        </Button>
      </div>
    </>
  );
}
