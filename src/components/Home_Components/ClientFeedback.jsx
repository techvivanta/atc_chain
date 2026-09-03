import React from "react";
import { motion } from "framer-motion";
import clientimg from "../../assets/images/clientfeedback.png";
import { CustomHeading } from "../common/CustomHeading";

const testimonials = [
  {
    id: 1,
    name: "Raj Gupta",
    role: "",
    image: clientimg,
    feedback:
      "We installed SS Slat Chain and Modular Belts from ATC and saw immediate improvement in reliability. The components are robust and the team guided us through the design and setup with professionalism.",
  },
  {
    id: 2,
    name: "Priyanka Mehra",
    role: "",
    image: clientimg,
    feedback:
      "The Thermoplastic Slat Chain and Sprockets we purchased have delivered consistent performance. The delivery was timely, and the technical support ensured seamless integration into our production line.",
  },
  {
    id: 3,
    name: "kaushyap Sharma",
    role: "",
    image: clientimg,
    feedback:
      "Our experience with ATC’s Wear Strips and Modular Belts has been exceptional. The wear strips resist friction, and the belts maintain tension over time. Their team answered all our implementation queries promptly.",
  },
  {
    id: 4,
    name: "Lalit Dalal",
    role: "",
    image: clientimg,
    feedback:
      "We sourced Sprockets, SS Slat Chain, and Modular Belts from ATC and have been extremely satisfied. The components are durable and performance is top-notch. Their customer support was responsive and helpful.",
  },
];

export default function ClientFeedback() {
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const nameVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };
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
    <section
      className="container mx-auto w-full px-4 md:px-10 lg:px-15 py-10 bg-white"
      style={
        window.innerWidth <= 1600
          ? {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh"
            }
          : {}
      }
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-left mb-5 max-w-4xl"
      >
        <motion.p className="text-[18px] text-[#2E437C] font-medium">
          Client Feedback
        </motion.p>

        <motion.h2 className="text-[30px] md:text-[48px] font-[700] text-[#2E437C] mt-2 leading-[1.17]">
          <CustomHeading
            title="Don't take our world for it!"
            className=""
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
          />
        </motion.h2>

        <motion.h3 className="text-[30px] md:text-[48px] font-bold text-[#BABEC8] leading-[1.17]">
          <CustomHeading
            title="Hear it from our partners."
            className=""
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
          />
        </motion.h3>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="flex md:flex-wrap overflow-x-auto md:overflow-visible gap-6 w-auto pb-4 scrollbar-hide md:hidden"
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(46, 67, 124, 0.15)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="bg-gradient-to-br from-[#F8F9FB] to-[#F0F2F7] p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-50 relative overflow-hidden group w-[280px] md:w-auto flex-shrink-0"
          >
            <motion.div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2E437C]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <motion.div
                className="flex items-center mb-4"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      duration: 0.2,
                    },
                  }}
                />
              </motion.div>

              <motion.p
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-700 text-[15px] leading-relaxed mb-4 relative"
              >
                <span className="text-[#2E437C] text-xl absolute -top-2 -left-1 opacity-30">
                  "
                </span>
                {t.feedback}
                <span className="text-[#2E437C] text-xl opacity-30">"</span>
              </motion.p>

              <motion.div
                variants={nameVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p
                  className="font-semibold text-gray-800 mb-1"
                  whileHover={{
                    color: "#2E437C",
                    transition: { duration: 0.2 },
                  }}
                >
                  {t.name}
                </motion.p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E437C] to-[#1d3b72] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className=" grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 hidden md:grid"
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              // boxShadow: "0 20px 40px rgba(46, 67, 124, 0.15)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="bg-gradient-to-br from-[#F8F9FB] to-[#F0F2F7] p-2 md:p-4 shadow-sm hover:shadow-xl cursor-pointer border border-gray-50 relative overflow-hidden group"
          >
            <motion.div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2E437C]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <motion.div
                className="flex items-center mb-4"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      duration: 0.2,
                    },
                  }}
                />
              </motion.div>

              <motion.p
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-700 text-[10px] md:text-[15px] leading-relaxed mb-4 relative"
                style={{ textAlign: "" }}
              >
                <span className="text-[#2E437C]  absolute -top-2 -left-1 opacity-30">
                  "
                </span>
                {t.feedback}
                <span className="text-[#2E437C] text-xl opacity-30">"</span>
              </motion.p>

              <motion.div
                variants={nameVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p
                  className="font-semibold text-gray-800 mb-1"
                  whileHover={{
                    color: "#2E437C",
                    transition: { duration: 0.2 },
                  }}
                >
                  {t.name}
                </motion.p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E437C] to-[#1d3b72] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
