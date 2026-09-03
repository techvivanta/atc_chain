import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import showcaseImg from "../../assets/images/Showcase.png";
import { CgArrowTopLeftO } from "react-icons/cg";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { CustomHeading } from "../common/CustomHeading";
import { useNavigate } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

import i1 from "../../assets/SVG/BEARING.svg";
import i2 from "../../assets/SVG/BUCKET.svg";
import i3 from "../../assets/SVG/SPPIRAL T2800.svg";
import i4 from "../../assets/SVG/AF 400.svg";
import i5 from "../../assets/SVG/MODULAR BELT.svg";
import i6 from "../../assets/SVG/FZ 90.svg";
import i7 from "../../assets/SVG/SS CHAIN & SPROCKET.svg";
import i8 from "../../assets/SVG/CONVEYOR COMPONENT.svg";
import i9 from "../../assets/SVG/FINGER CHAIN.svg";
import i10 from "../../assets/SVG/WEAR STRIP_1.svg";
import i11 from "../../assets/SVG/THERMO PLASTIC CHAIN.svg";

const ShowCase = () => {
  const navigate = useNavigate();
  const [activePoint, setActivePoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
  };

  const closeMobileCard = () => {
    setSelectedPoint(null);
  };
  const getTooltipPosition = (point) => {
  const leftPercent = parseFloat(point.left);
  const topPercent = parseFloat(point.top);

  let translateX = "-50%";
  let translateY = "0";

  if (leftPercent < 20) translateX = "0";
  if (leftPercent > 80) translateX = "-100%";

  if (topPercent > 60) {
    translateY = "-100%";      
  } else {
    translateY = "0";          
  }

  return {
    left: point.left,
    top: point.top,
    transform: `translate(${translateX}, ${translateY})`,
  };
};

  // const getTooltipPosition = (point) => {
  //   const leftPercent = parseFloat(point.left);
  //   const topPercent = parseFloat(point.top);

  //   let translateX = "-50%";
  //   let translateY = "0";

  //   if (leftPercent < 20) translateX = "0";
  //   if (leftPercent > 80) translateX = "-100%";

  //   if (topPercent > 70) translateY = "-100%";
  //   if (topPercent < 20) translateY = "0"; // prevents cutting on top if needed

  //   return {
  //     left: point.left,
  //     top: point.top,
  //     transform: `translate(${translateX}, ${translateY})`,
  //   };
  // };
  const points = [
    {
      id: 1,
      top: "30%",
      left: "12%",
      title: "Bucket Elevator",
      desc: "Vertical conveying system for bulk materials with high capacity and efficiency.",
      img: i2,
      path:"/products?category=8"
    },
    {
      id: 2,
      top: "75%",
      left: "13%",
      title: "BEARING",
      desc: "High-quality bearings ensuring smooth operation and reduced maintenance.",
      img: i1,
      path:"/products?category=1"
    },
    {
      id: 3,
      top: "42%",
      left: "58%",
      title: "Spiral Freezer",
      desc: "Multi-level spiral conveyor system for continuous freezing operations.",
      img: i3,
      path:"/products?category=10"
    },
    {
      id: 4,
      top: "31%",
      left: "31%",
      title: "Spiral Logistics",
      desc: "Space-efficient spiral conveyor solutions for material handling and storage.",
      img: i4,
      path:"/products?category=11"
    },
    {
      id: 5,
      top: "47%",
      left: "84%",
      title: "MODULAR BELT",
      desc: "Interlocking plastic belt system providing flexibility and easy maintenance.",
      img: i5,
      path:"/products?category=4"
    },
    {
      id: 6,
      top: "67%",
      left: "39%",
      title: "Flexzero",
      desc: "Flexible chain system designed for tight radius turns and compact applications.",
      img: i6,
      path:"/products?category=12"
    },
    {
      id: 7,
      top: "76%",
      left: "90%",
      title: "SS CHAIN & SPROCKET",
      desc: "Stainless steel chain and sprocket systems for food-grade applications.",
      img: i7,
      path:"/products?category=5"
    },
    {
      id: 8,
      top: "86%",
      left: "54.5%",
      title: "CONVEYOR COMPONENT",
      desc: "Essential components including guides, wear strips, and support structures.",
      img: i8,
      path:"/products?category=3"
    },
    {
      id: 9,
      top: "60%",
      left: "22%",
      title: "FINGER CHAIN & ASSEMBLY",
      desc: "Specialized chain system with fingers for secure product transport and positioning.",
      img: i9,
      path:"/products?category=7"
    },
    {
      id: 10,
      top: "65%",
      left: "77%",
      title: "WEAR STRIP",
      desc: "Durable wear strips providing smooth surface for belt operation and longevity.",
      img: i10,
      path:"/products?category=9"
    },
    {
      id: 11,
      top: "83%",
      left: "80%",
      title: "THERMOPLASTIC CHAIN & SPROCKET",
      desc: "Lightweight thermoplastic chain systems ideal for food processing environments.",
      img: i11,
      path:"/products?category=6"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <section className="container mx-auto w-full px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 2xl:pb-25  relative  bg-white overflow-visible ">
      <div className="px-0 md:px-0 md:text-left text-left">
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="
      text-left
      text-[30px] md:text-[48px]
      text-[#2E437C] leading-[1.17] font-[700]
    "
        >
          <CustomHeading
            title="Interactive"
            className="text-[#2E437C]"
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
          />
          <br />
          <CustomHeading
            title="Product Showcase"
            className="text-[#BABEC8]"
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
          />
        </motion.h2>
      </div>

      <div className="  relative mx-auto custom-image max-w-[1050px] px-4 sm:px-6 lg:px-1 overflow-visible">
        <div
          className="relative w-full aspect-[16/9]  overflow-visible cursor-not-allowed select-none lg:mb-12"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        >
          <img
            src={showcaseImg}
            alt="Product Showcase"
            className="w-full h-full object-contain"
          />

          {points.map((point) => (
            <motion.div
              key={point.id}
              className="absolute"
              style={{ top: point.top, left: point.left }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() =>
                window.innerWidth >= 768 && setActivePoint(point.id)
              }
              onMouseLeave={() =>
                window.innerWidth >= 768 && setActivePoint(null)
              }
              onClick={() => window.innerWidth < 768 && handlePointClick(point)}
            >
              {/* Hotspot Button */}
              <button
                aria-label="Hotspot"
                className="relative flex items-center justify-center
          w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4
          bg-orange-500 text-white rounded-full shadow-lg
          cursor-pointer transition-transform duration-200
          hover:scale-110 active:scale-95"
                // onClick={() => navigate("/products")}
              >
                <span clas  sName="absolute inset-0 rounded-full bg-orange-500/40 animate-[ripple_2.5s_linear_infinite]" />
                <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-[ripple_2.5s_linear_infinite] [animation-delay:1.25s]" />
                <TiPlus className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 relative z-10" />
              </button>

              {/* Desktop Tooltip */}
              <AnimatePresence>
                {activePoint === point.id && window.innerWidth >= 768 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-50 w-52 sm:w-60 md:w-64 bg-white rounded-xl shadow-xl p-3 sm:p-4"
                    // style={getTooltipPosition(point)}
                    style={{ ...getTooltipPosition(point),marginLeft:"20px", marginTop: "-80px" }}

                  >
                    <div className="flex gap-6 items-start">
                      <img src={point.img} className="w-10" alt={point.title} />
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-[#2E437C]">
                          {point.title}
                        </h4>
                        <p className="text-[12px] font-[400] text-[#667085]">
                          {point.desc}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 sm:mt-3 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2
                   rounded-full border border-[#2E437C] text-[#000]
                   text-xs sm:text-sm font-medium hover:bg-[#2E437C]
                   hover:text-white transition-all"
                          onClick={() => navigate(point.path)}
                        >
                          VIEW{" "}
                          <RxArrowTopRight className="ms-2 text-[#2E437C] hover:text-[#fff]" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="absolute custom-position bottom-[-18%] right-[0%] md:bottom-[0%] md:right-[-20%]  w-full flex justify-end text-black px-2 sm:px-4">
          <div className="flex flex-col items-start leading-tight text-left">
            {/* Title */}
            <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">
              Explore
            </span>

            {/* Subtitle + Arrow */}
            <div className="flex items-center gap-1 sm:gap-2">
              <BsArrowDownLeftCircle className="text-base sm:text-lg md:text-xl lg:text-2xl shrink-0" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                Click or Hover on any point
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPoint && window.innerWidth < 768 && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl p-6 w-[60%] max-w-md relative"
            >
              <button
                onClick={closeMobileCard}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="flex gap-6 items-start">
                <img src={selectedPoint.img} className="w-10" alt={selectedPoint.title} />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#2E437C]">
                    {selectedPoint.title}
                  </h4>
                  <p className="text-[12px] font-[400] text-[#667085]">
                    {selectedPoint.desc}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 sm:mt-3 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2
                   rounded-full border border-[#2E437C] text-[#000]
                   text-xs sm:text-sm font-medium hover:bg-[#2E437C]
                   hover:text-white transition-all"
                    onClick={() => navigate(point.path)}
                  >
                    VIEW <RxArrowTopRight className="ms-2 text-[#2E437C] hover:text-[#fff]" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowCase;
