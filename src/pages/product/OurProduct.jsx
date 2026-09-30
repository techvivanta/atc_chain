import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCom from "../../components/ProductComponent/ProductCom";
import Navbar from "../../components/Navbar/Navbar";
import Seo from "../../components/common/Seo";

gsap.registerPlugin(ScrollTrigger);

function OurProduct() {
  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  return (
    <>
      <Seo
        title="Industrial Conveyor Chains & Belts Manufacturer | ATC Chain"
        description="Explore industrial conveyor chains, modular belts, slat chains, conveyor components and cable drag chains from ATC Chain for reliable conveying solutions."
        keywords="Conveyor Chain Manufacturer, Industrial Conveyor Chains, Conveyor Chain Manufacturer in India, Modular Belt Manufacturer, Modular Conveyor Belts, Slat Chain Manufacturer, SS Slat Chain, Thermoplastic Slat Chain, Conveyor Components, Cable Drag Chain, Conveyor Chain Supplier India, Industrial Conveyor Components"
        url="https://atcchain.com/products"
        image="https://atcchain.com/images/social-preview.jpg"
      />

      <Navbar navStyle={"white"} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="min-h-screen bg-white"
      >
        <motion.div
          className="w-full bg-gradient-to-b from-gray-50/30 to-white pt-20 md:pt-24 lg:pt-15"
          variants={contentVariants}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <ProductCom />
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2E437C] to-[#1d3b72] origin-left z-40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1,
          }}
        />
      </motion.div>
    </>
  );
}

export default OurProduct;
