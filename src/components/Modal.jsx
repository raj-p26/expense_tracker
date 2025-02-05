/* eslint-disable react/prop-types */
import { useEffect } from "react";

export function Modal({
  show = false,
  onCancel = () => {},
  title = "",
  subtitle = "",
  staticBackdrop = false,
  children,
}) {
  useEffect(() => {
    const keyDownEvent = (ev) => {
      if (ev.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", keyDownEvent);

    return () => {
      document.removeEventListener("keydown", keyDownEvent);
    };
  }, [onCancel]);
  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-[#000]/75 z-50 transition"
          onClick={staticBackdrop ? () => {} : onCancel}
        ></div>
      )}
      <div
        className={`fixed inset-[50%] max-w-[600px] w-[80%] translate-x-[-50%] translate-y-[-50%] h-fit p-6 bg-surface-container text-on-surface rounded-3xl shadow-xl z-[100] transition ${show ? "scale-1" : "scale-0"}`}
      >
        <div className="modal-header mb-6">
          <h1 className="text-2xl">{title}</h1>
          <h2 className="font-light">{subtitle}</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
}
