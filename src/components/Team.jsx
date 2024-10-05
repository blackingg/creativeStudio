import React, { useEffect, useState } from "react";

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const TeamMembers = [
    {
      name: "Abel",
      role: "3d Artist",
      image: "/img/profile/Abel.png",
    },
    {
      name: "Rose",
      role: "3d Artist",
      image: "/img/profile/Rose.png",
    },
    {
      name: "Sope",
      role: "Level Designer",
      image: "/img/profile/Sope.png",
    },
    {
      name: "Billy",
      role: "Character Designer",
      image: "/img/profile/Billy.png",
    },
    {
      name: "Annabelle",
      role: "Sound Designer",
      image: "/img/profile/Anna.png",
    },
    {
      name: "Kelvin",
      role: "3d Artist",
      image: "/img/profile/Kelvin.png",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden w-full bg-black text-[#fff] px-4 lg:px-8 lg:py-14">
      <div className="lg:mx-[10%]">
        <h2 className="text-4xl font-bold mb-8 pt-7 lg:pt-1">Team</h2>
        <div className="flex flex-col space-y-10">
          {TeamMembers.map((member, index) => (
            <div
              key={index}
              className="relative"
            >
              <div
                className={`alt-cursor w-full py-2 border-b-[1px] border-b-white hover:border-b-[#8e8d4c] grid grid-cols-3 text-white hover:pl-5 transition-all duration-300 items-center`}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <h3 className="text-lg lg:text-xl font-bold text-start">
                  {member.name}
                </h3>
                <p className="hidden lg:block text-sm  text-center">
                  Hover to preview
                </p>
                <p className="block lg:hidden text-sm text-center">Click</p>
                <p className="text-sm md:text-base text-end">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hoveredMember && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        >
          <img
            src={hoveredMember.image}
            alt={hoveredMember.name}
            className="w-[60vw] h-[40vh] lg:w-[20vw] lg:h-[40vh] rounded-sm object-cover border-2 border-[#8e8d4c] transition-all duration-300 overflow-hidden"
          />
        </div>
      )}
    </div>
  );
};

export default Team;
