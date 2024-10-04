import React, { useEffect, useState } from "react";

const WhatWeDo = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const sections = [
    {
      title: "Immersive Environmental Experiences",
      content:
        "We create immersive environments that blend creativity and technical precision, transporting users to beautifully designed worlds.",
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
        "We offer top-tier 3D modeling and sculpting, delivering fully textured assets ready for integration.",
      image: "/img/whatWeDo/3d_modeling.png",
    },
    {
      title: "Motion Capture Animation",
      content:
        "We use advanced motion capture to create ultra-realistic animations for films, games, and VR experiences.",
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
      <div className="lg:mx-[10%]">
        <h2 className="text-4xl font-bold mb-8">What We Do</h2>
        {showPopup && (
          <div className="animate-bounce p-1 rounded-full fixed top-[7%] right-2 lg:right-auto lg:left-2 bg-white text-[#8e8d4c] z-10 ">
            <h1 className="p-1 lg:p-2 border border-[#8e8d4c] rounded-full text-xs lg:text-sm font-bold">
              Click the picture
            </h1>
          </div>
        )}

        <div className="flex flex-wrap gap-4 md:gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col transition-all duration-300 ease-in-out"
              style={{
                flexBasis:
                  index === 0 || index === 3
                    ? hoveredSection === index
                      ? "37%"
                      : "35%"
                    : index === sections.length - 1
                    ? hoveredSection === index
                      ? "100%"
                      : "97%"
                    : hoveredSection === index
                    ? "42%"
                    : "40%",
              }}
            >
              <div
                className={`relative group rounded-lg overflow-hidden flex-grow transition-all duration-500 ease-in-out alt-cursor`}
                onMouseEnter={() => setHoveredSection(index)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  backgroundImage: `url(${section.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: window.innerWidth >= 768 ? "20vh" : "20vh",
                  flexGrow: hoveredSection === index ? 10 : 2.5,
                }}
              >
                <div
                  className={`absolute inset-0 flex flex-col justify-center backdrop-blur-md transition-opacity duration-300 text-white px-1 md:px-3 lg:px-4 space-y-1 md:space-y-2 ${
                    hoveredSection === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-sm md:text-base">{section.content}</p>
                </div>
              </div>
              <h3
                className="mt-1 text-sm lg:text-xl font-bold alt-cursor"
                onMouseEnter={() => setHoveredSection(index)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {section.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
