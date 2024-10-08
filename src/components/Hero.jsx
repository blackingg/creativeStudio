import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeWritter } from "typewritter";

const BRUSH_SIZE = 90;

function Hero({ isLoading, backgroundImages }) {
  const canvasRef = useRef(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawInitialCanvas();
    };

    const drawInitialCanvas = () => {
      drawCoverImage(ctx, backgroundImages[0]);
    };

    const drawCoverImage = (ctx, img) => {
      const imageAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageAspectRatio > canvasAspectRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = -(drawWidth - canvas.width) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = -(drawHeight - canvas.height) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoading, backgroundImages]);

  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const paint = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pointerPosition.x, pointerPosition.y, BRUSH_SIZE, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "destination-atop";
      drawCoverImage(ctx, backgroundImages[1]);
      ctx.globalCompositeOperation = "source-over";
    };

    const drawCoverImage = (ctx, img) => {
      const imageAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageAspectRatio > canvasAspectRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = -(drawWidth - canvas.width) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = -(drawHeight - canvas.height) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    if (isPointerDown && pointerPosition.x !== 0 && pointerPosition.y !== 0) {
      paint();
    }
  }, [pointerPosition, isPointerDown, isLoading, backgroundImages]);

  const handlePointerMove = (event) => {
    if (!isPointerDown) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;
    setPointerPosition({ x, y });
  };

  const handlePointerDown = (event) => {
    setIsPointerDown(true);
    handlePointerMove(event);
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
  };

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  return (
    <div className="relative w-full h-screen pl-10 overflow-hidden flex">
      <>
        <div className="flex-1 flex justify-center items-center">
          {!isLoading && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 5,
                stiffness: 40,
                restDelta: 0.001,
                duration: 0.3,
              }}
              className="text-[#8e8d4c]"
            >
              <TypeWritter
                text="Hi,"
                speed={0.1}
                fontSize={"4.5rem"}
                loop={false}
              />
              <TypeWritter
                text="Welcome to 12 studios!"
                speed={100}
                fontSize={"4.5rem"}
                loop={false}
              />
            </motion.div>
          )}
        </div>
        <div className="relative flex-1 w-full h-full flex justify-end items-center">
          <div className="hidden md:block relative w-4/5 h-[90%] mr-5">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              onMouseMove={handlePointerMove}
              onMouseDown={handlePointerDown}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchMove={handlePointerMove}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
              style={{ touchAction: "none" }}
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default Hero;
