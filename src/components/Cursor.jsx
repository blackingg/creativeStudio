import React, { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.35;

export const Cursor = () => {
  const cursorOutlineRef = useRef(null);
  const [hoverButton, setHoverButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -10, y: -10 });
  const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleButtonHover = (event) => {
      const isHoverable = (element) => {
        return (
          element.tagName.toLowerCase() === "button" ||
          element.classList.contains("alt-cursor") ||
          element.closest(".alt-cursor") !== null
        );
      };

      let currentElement = event.target;
      while (currentElement && !isHoverable(currentElement)) {
        currentElement = currentElement.parentElement;
      }

      setHoverButton(!!currentElement);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleButtonHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleButtonHover);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (cursorOutlineRef.current) {
        const distX = mousePosition.x - outlinePosition.x;
        const distY = mousePosition.y - outlinePosition.y;

        setOutlinePosition({
          x: outlinePosition.x + distX * CURSOR_SPEED,
          y: outlinePosition.y + distY * CURSOR_SPEED,
        });

        cursorOutlineRef.current.style.left = `${outlinePosition.x}px`;
        cursorOutlineRef.current.style.top = `${outlinePosition.y}px`;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, outlinePosition]);

  return (
    <div
      className={`hidden lg:block fixed pointer-events-none z-50 transition-transform -translate-x-1/2 -translate-y-1/2 ${
        hoverButton
          ? "w-7 h-7 border-[3px] border-[#8d114b] bg-transparent"
          : "w-[15px] h-[15px] bg-[#8d114b]"
      } rounded-full`}
      style={{
        left: `${outlinePosition.x}px`,
        top: `${outlinePosition.y}px`,
      }}
      ref={cursorOutlineRef}
    />
  );
};

export default Cursor;
