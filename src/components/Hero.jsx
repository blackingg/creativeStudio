import React, { useEffect, useRef, useState } from "react";

const BRUSH_SIZE = 90;

function Hero() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([null, null]);

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = ["img/wallpaperBW.png", "img/wallpaperColor.png"];
      const loadedImages = await Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
          });
        })
      );
      setBackgroundImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to match the container's size
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Draw Image 1 (top layer) with "cover" effect
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

    drawCoverImage(ctx, backgroundImages[0]);
  }, [imagesLoaded, backgroundImages]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const paint = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(mousePosition.x, mousePosition.y, BRUSH_SIZE, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "destination-atop";

      // Draw Image 2 (bottom layer) with "cover" effect
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

      drawCoverImage(ctx, backgroundImages[1]);

      ctx.globalCompositeOperation = "source-over";
    };

    if (mousePosition.x !== 0 && mousePosition.y !== 0) {
      paint();
    }
  }, [mousePosition, imagesLoaded, backgroundImages]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative w-screen h-screen m-0 pl-10 overflow-hidden flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="text-[#8e8d4c]">
          <h1 className="text-3xl md:text-7xl">Hi,</h1>
          <h1 className="text-7xl md:text-8xl">Welcome to 12 studios!</h1>
        </div>
      </div>
      <div className="relative flex-1 w-full h-full flex justify-end items-center">
        <div className="hidden lg:block relative w-4/5 h-[90%] mr-5">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            onMouseMove={handleMouseMove}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
