import React, { useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import WhatWeDo from "./components/WhatWeDo";
import Team from "./components/Team";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImages, setBackgroundImages] = useState([null, null]);

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = ["img/wallpaperBW.png", "img/wallpaperColor.png"];
      try {
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
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to load images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="bg-black relative cursor-none w-screen min-h-screen">
      {isLoading ? (
        <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <Cursor />
          <div className="w-screen h-screen scroll-smooth snap-y overflow-y-scroll scrollbar-thin">
            <div className="snap-start h-screen sticky top-0">
              <Hero
                isLoading={isLoading}
                backgroundImages={backgroundImages}
              />
            </div>
            <div className="snap-start h-full min-h-screen sticky top-0">
              <WhatWeDo />
            </div>
            <div className="snap-start h-screen sticky top-0">
              <Gallery />
            </div>
            <div className="snap-start h-screen sticky top-0">
              <Team />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
