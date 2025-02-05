import { useRippleEffect } from "../useRipple";

/* eslint-disable react/prop-types */
export function Button({
  children,
  type = "primary",
  disableWith = "Loading...",
  disabled = false,
  onClick = () => {},
}) {
  if (typeof onClick !== "function") {
    throw new Error("Expected onClick to have callback function");
  }

  const { createRipple, rippleContainerRef } = useRippleEffect();

  const BUTTON_TYPES = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary text-on-secondary",
    tertiary: "bg-tertiary text-on-tertiary",
    error: "bg-error text-on-error",
    outline: "border border-primary text-primary",
    fab: "bg-primary-container text-on-primary-container",
    text: "bg-transparent text-primary",
  };
  const buttonStyle =
    BUTTON_TYPES[type] || "bg-primary-container text-on-primary-container";

  const onButtonClick = (event) => {
    if (disabled) event.preventDefault();

    createRipple(event);
    onClick(event);
  };

  return (
    <>
      <div
        className={
          type === "fab" ? "fixed bottom-0 right-0 mb-14 mr-14" : "inline"
        }
      >
        <button
          ref={rippleContainerRef}
          className={`${buttonStyle} ${disabled ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"} ${type === "fab" ? "md:p-4 p-6 rounded-2xl" : "px-4 py-2 rounded-xl"} ${type !== "text" ? "shadow-lg" : ""} inline-block z-1`}
          onClick={onButtonClick}
        >
          {disabled ? disableWith : children}
        </button>
      </div>
    </>
  );
}
