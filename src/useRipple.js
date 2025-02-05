import { useRef } from "react";

export function useRippleEffect() {
  const rippleContainerRef = useRef(null);

  const createRipple = (event) => {
    const container = rippleContainerRef.current;

    if (!container) return;

    container.classList.add("ripple-container");

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.top = `${y}px`;
    ripple.style.left = `${x}px`;
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.background = "rgba(0, 0, 0, 0.3)";
    ripple.style.animation = "animate-ripple 0.8s ease-out";

    container.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      container.classList.remove("ripple-container");
      ripple.remove();
    });
  };

  return { rippleContainerRef, createRipple };
}
