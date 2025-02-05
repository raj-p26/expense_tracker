/* eslint-disable react/prop-types */

import { useRippleEffect } from "../useRipple";

export default function ListItem({
  title,
  supporting,
  onClick = () => {},
  children,
}) {
  const { createRipple, rippleContainerRef } = useRippleEffect();

  const onDivClick = (event) => {
    createRipple(event);
    onClick(event);
  };
  return (
    <>
      <div
        ref={rippleContainerRef}
        className="bg-surface text-on-surface py-2 px-4 flex justify-between hover:bg-[white]/10 transition"
        onClick={onDivClick}
      >
        <div>
          <p className="text-xl font-medium">{title}</p>
          <p className="text-sm">{supporting}</p>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
