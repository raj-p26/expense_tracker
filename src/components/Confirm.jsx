/* eslint-disable react/prop-types */
import { Modal } from "@components/Modal.jsx";
import { Button } from "@components/Button.jsx";

export default function Confirm({
  title = "Confirmation Title",
  subtitle = "Supporting Text",
  onCancel = () => {},
  onConfirm = () => {},
  show = false,
}) {
  return (
    <>
      <Modal
        show={show}
        title={title}
        subtitle={subtitle}
        onCancel={onCancel}
        staticBackdrop
      >
        <div className="w-fit ml-auto">
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="text" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
