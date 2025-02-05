/* eslint-disable react/prop-types */

import { useRippleEffect } from "../useRipple";

export default function Card({ children, title = "", onClick = () => {} }) {
  const { createRipple, rippleContainerRef } = useRippleEffect();

  const onDivClick = (event) => {
    createRipple(event);
    onClick(event);
  };

  return (
    <div
      ref={rippleContainerRef}
      onClick={onDivClick}
      className="bg-surface-container-low w-[90%] max-w-[600px] rounded-xl shadow-lg mx-auto p-4"
    >
      <h1 className="text-2xl mb-4 font-medium">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
