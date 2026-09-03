import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";
import NewsGrid from "../common/NewsGrid";
import { CustomHeading } from "../common/CustomHeading";
import { useNavigate } from "react-router-dom";

const tabs = ["Latest", "Blogs", "Events", "Featured Product"];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("Latest");

  const navigate = useNavigate();

  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const headerVariants = {
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

  return (
    <div className="container mx-auto w-full bg-white px-4 md:px-10 lg:px-15 py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-8"
      >
        <motion.h2
          className="text-[30px] md:text-[48px] font-bold text-[#2E437C] text-left leading-[1.17]"
          variants={headerVariants}
        >
          <span className="text-[#2E437C]">
            <CustomHeading
              as="span"
              title="Industry Resources "
              className=""
              headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
            />
          </span>
          <span className="text-[#BABEC8]">
            <CustomHeading
              as="span"
              title="& Technical Insights"
              className=""
              headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
            />
          </span>
        </motion.h2>

        <motion.p
          className="mt-2 text-[#343434] text-sm sm:text-base"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: 0.2 },
            },
          }}
        >
          The latest industry news, interviews, technologies, and resources.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={tabContainerVariants}
        className="relative flex justify-start gap-4 border-b w-full md:w-100 border-gray-200 mb-8 text-sm sm:text-base"
      >
        <motion.div
          className="absolute bottom-0 h-0.5 rounded-full"
          layoutId="activeTabIndicator"
          initial={false}
          animate={{
            width: `${100 / tabs.length}%`,
            x: `${tabs.indexOf(activeTab) * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          }}
        />

        {tabs.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => handleTabClick(tab)}
            variants={tabVariants}
            className={`relative pb-3 px-2 transition-colors duration-300 ${
              activeTab === tab
                ? "text-[#2E437C] font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
            whileHover={{
              scale: 1.02,
              y: -1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            <motion.span
              animate={{
                color: activeTab === tab ? "#2E437C" : "#6B7280",
              }}
              transition={{ duration: 0.2 }}
            >
              {tab}
            </motion.span>

            {activeTab === tab && (
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#2E437C] rounded-full"
                layoutId="tabUnderline"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3,
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      <NewsGrid
        activeTab={activeTab}
        initialPostsCount={4}
        screen={"home"}
        gridCols="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"

        // searchQuery={searchQuery}
        // className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.8,
        }}
        className="flex justify-center mt-12"
      >
        <AnimatedButton
          icon={MdArrowOutward}
          color={"#2E437C"}
          hoverColor={`#2E437C`}
          onClick={() => navigate("/news")}
        >
          VIEW ALL RESOURCES
        </AnimatedButton>
      </motion.div>
    </div>
  );
}
