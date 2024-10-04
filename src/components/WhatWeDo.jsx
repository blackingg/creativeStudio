import React, { useEffect, useState } from "react";

const WhatWeDo = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const sections = [
    {
      title: "Immersive Environmental Experiences",
      content:
        "We craft stunning environmental experiences that transport users into beautifully designed worlds, blending creativity with technical precision.",
      image: "/img/whatWeDo/cube_diorama.png",
    },
    {
      title: "Character Rigging & Animation",
      content:
        "Our team excels at character rigging, ensuring smooth and lifelike animations for game development and cinematic projects.",
      image: "/img/whatWeDo/character_rigging.png",
    },
    {
      title: "3D Modeling & Sculpting",
      content:
        "We provide high-quality 3D modeling and sculpting services, from concept to fully textured assets ready for integration.",
      image: "/img/whatWeDo/3d_modeling.png",
    },
    {
      title: "Motion Capture Animation",
      content:
        "Utilizing state-of-the-art motion capture technology, we create hyper-realistic animations for films, games, and virtual reality experiences.",
      image: "/img/whatWeDo/motion_capture.png",
    },
    {
      title: "Virtual Reality Experiences",
      content:
        "We design and develop immersive virtual reality experiences that engage users through interactive environments and storytelling.",
      image: "/img/whatWeDo/virtual_reality.png",
    },
  ];

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page min-h-screen w-full bg-black text-[#fff] p-8 py-14">
      <div className="mx-[10%]">
        <h2 className="text-4xl font-bold mb-8">What We Do</h2>
        {showPopup && (
          <div className="animate-bounce p-1 rounded-full fixed top-[7%] left-2 bg-white text-[#8e8d4c] z-10 ">
            <h1 className="p-2 border border-[#8e8d4c] rounded-full text-sm font-bold">
              Click the picture
            </h1>
          </div>
        )}

        <div className="flex flex-wrap gap-8 overflow-y-auto max-h-[75vh] md:max-h-none">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`relative group rounded-lg overflow-hidden flex-1 ${
                index === 0 || index === 3
                  ? "basis-full md:basis-[42%] lg:basis-[30%]"
                  : index === sections.length - 1
                  ? "basis-full"
                  : "basis-full md:basis-[50%] lg:basis-[65%]"
              } transition-[flex-grow] duration-500 ease-in-out alt-cursor`}
              onMouseEnter={() => setHoveredSection(index)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                backgroundImage: `url(${section.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: window.innerWidth >= 768 ? "25vh" : "20vh",
                flexGrow: hoveredSection === index ? 10 : 0.5,
              }}
            >
              <div
                className={`absolute inset-0 flex flex-col justify-center backdrop-blur-md transition-opacity duration-300 text-white px-6 md:px-3 lg:px-4 space-y-1 md:space-y-2 ${
                  hoveredSection === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-lg lg:text-xl font-bold">
                  {section.title}
                </h3>
                <p className="text-sm md:text-base">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
