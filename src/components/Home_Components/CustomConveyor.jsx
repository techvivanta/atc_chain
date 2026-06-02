import React from "react";
import { motion } from "framer-motion";
import ConveyorImage from "../../assets/images/custom_conveyor.png";
import { RxArrowRight } from "react-icons/rx";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";
import { useNavigate } from "react-router-dom";

export default function ExpertSolutions() {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.9,
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.01,
      y: -1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.4,
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
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
    <section className="container mx-auto px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-5  bg-white font-articulat grid-center-box-100">
      <div className="min-h-screen flex flex-col-reverse mx-auto lg:flex-row items-center justify-between w-full">
        <motion.div
          className="
    w-full 
    max-w-[90%] sm:max-w-2xl lg:max-w-4xl
    lg:w-1/2
    lg:pr-16 xl:pr-20
    mb-5 lg:mb-0
    grid-center-box-100
  "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.h2
            variants={containerVariants}
            className="
      text-[38px] md:text-[48px]
      leading-[45px] sm:leading-[44px] md:leading-[52px] lg:leading-[60px] text-[#BABEC8]
      font-[600] mb-6 sm:mb-5"
          >
            Expert{" "}
            <span className="text-[#2E437C] font-[600]">
              Solutions for Custom Conveyor
            </span>{" "}
            Needs.
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p
            className="
      text-sm sm:text-base md:text-[16px]
      text-[#A0A3AD]
      leading-relaxed
      font-normal
      s-para
    "
            variants={textRevealVariants}
          >
            We are a team of 150+ experts leading and thriving in the
            manufacturing industry. Our large warehouse capacity facilitates
            extensive production services, enabling us to build robust products
            and machinery designed to last for generations.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            className="
      text-sm sm:text-base md:text-[16px]
      text-[#A0A3AD]
      leading-relaxed
      font-normal s-para
    "
            variants={textRevealVariants}
          >
            With expertise across multiple industries, we deliver intelligent
            and unique belt solutions tailored to your specific requirements.
            Our long-term vision is to build a customer-centric brand through
            impeccable service and quality.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-12 sm:w-16 md:w-20 h-[2px] bg-[#2E437C] mb-6 sm:mb-8"
            variants={textRevealVariants}
          />

          {/* Button */}
          <motion.div
            variants={textRevealVariants}
            whileHover="hover"
            whileTap="tap"
            className=""
            onClick={() =>
              window.open(
                "https://curveconveyor.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <AnimatedButton
              icon={RxArrowRight}
              color="#2E437C"
              hoverColor="#2E437C"
            >
              Explore Product
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 w-full flex justify-center lg:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageVariants}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        >
          <motion.img
            src={ConveyorImage}
            alt="Custom Conveyor"
            className="w-full object-contain pointer-events-none select-none"
            whileHover={{
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.4,
              },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
