import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gallery from "./Gallery";
import WhatWeDo from "./WhatWeDo";
import Team from "./Team";

gsap.registerPlugin(ScrollTrigger);

const Body = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pageElements = container.querySelectorAll(".page");
    pageElements.forEach((page, i) => {
      ScrollTrigger.create({
        trigger: page,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        markers: false,
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <WhatWeDo />
      <Gallery />
      <Team />
    </div>
  );
};

export default Body;
