import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import NewsGrid from "../../components/common/NewsGrid";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";
import { HiDownload } from "react-icons/hi";
import Seo from "../../components/common/Seo";

const News = () => {
  const [activeTab, setActiveTab] = useState("Latest");
  const initialPostsCount = 8;
  const [loadMoreInfo, setLoadMoreInfo] = useState({
    hasMore: false,
    remaining: 0,
    total: 0,
    handleLoadMore: null,
  });

  const tabs = ["Latest", "Blogs", "Events", "Featured Product"];

  const handleLoadMoreInfo = (info) => {
    setLoadMoreInfo(info);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <>
      <Seo
        title="Conveyor Chain Industry News & Insights | ATC Chain"
        description="Read the latest conveyor chain industry news, insights, product updates and technical developments from ATC Chain, a manufacturer of industrial conveyor solutions."
        keywords="conveyor chain news, conveyor industry news, conveyor chain industry insights, conveyor technology news, industrial conveyor news, conveyor chain manufacturer, conveyor chain manufacturer in India, industrial conveyor chains, conveyor systems, conveyor solutions, modular conveyor belt, slat chain, stainless steel slat chain, thermoplastic slat chain, conveyor components, industrial automation, conveyor chain technology, conveyor manufacturing, conveyor industry trends, ATC Chain"
        url="https://atcchain.com/news"
        image="https://atcchain.com/images/social-preview.jpg"
      />

      <Navbar navStyle={"white"} />

      <motion.div
        className="w-full bg-gradient-to-b from-gray-50/30 to-white pt-20 md:pt-15 lg:pt-15"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            className="flex justify-start py-6"
            variants={headerVariants}
          >
            <motion.div
              className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide"
              variants={tabContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 px-5 me-0 text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? "text-[#2E437C] font-semibold border-b-2 border-[#2E437C]"
                      : "text-gray-500 hover:text-gray-700 border-b border-[#f2f2f2]"
                  }`}
                  variants={tabVariants}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#2E437C] rounded-full"
                      layoutId="activeTabUnderline"
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
          </motion.div>
        </div>
      </motion.div>

      <NewsGrid
        activeTab={activeTab}
        searchQuery=""
        initialPostsCount={initialPostsCount}
        onLoadMore={handleLoadMoreInfo}
        showLoadMoreButton={true}
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
      />

      {loadMoreInfo.hasMore && (
        <motion.div
          className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 sm:py-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedButton
              icon={HiDownload}
              color={"#2E437C"}
              hoverColor={"#1E2F5C"}
              onClick={loadMoreInfo.handleLoadMore}
            >
              Load More ({loadMoreInfo.remaining} remaining)
            </AnimatedButton>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default News;
