import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  py = 4,
  px = 6,
  icon: Icon,
  disabled = false,
  color,
  hoverColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`relative cursor-pointer  inline-flex items-center active:scale-50 font-medium px-${px} py-${py} rounded-full overflow-hidden transition-all duration-[600ms] ease-in-out group `}
      
      style={{
         color: isHovered ? "white" : color,
         border: `1px solid ${isHovered ? hoverColor : color}`,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,

      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={` absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full transition-transform duration-[1100ms] ease-in-out will-change-transform ${
          isHovered ? "scale-[30]" : "scale-100"
        }`}
        style={{ backgroundColor: hoverColor }}
      />

      <span className="relative z-10 transition-colors duration-[600ms]">
        {children}
      </span>

      <span className="relative z-10 ml-3 h-8 w-8 overflow-hidden flex items-center justify-center">
        <Icon
          size={20}
          className={`absolute transition-transform duration-[600ms] text-white ease-in-out ${
            isHovered ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"
          }`}
        />
        <Icon
          size={20}
          className={`absolute transition-transform duration-[600ms] text-white ease-in-out ${
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default AnimatedButton;
