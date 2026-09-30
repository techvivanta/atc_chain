import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { HiDownload } from "react-icons/hi";

// Components
import Navbar from "../../components/Navbar/Navbar";
import SectionTitle from "../../components/aboutUsComponents/SectionTitle";
import AnimatedImage from "../../components/aboutUsComponents/AnimatedImage";
import TeamCard from "../../components/aboutUsComponents/TeamCard";
import TimelineItem from "../../components/aboutUsComponents/TimelineItem";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";
import { LuDownload } from "react-icons/lu";

// Assets
import BgVideo from "../../assets/Video/aboutUs.mp4";
import a1 from "../../assets/images/a1.jpg";
import a2 from "../../assets/images/a2.jpg";

import l1 from "../../assets/images/l1.png";
import l2 from "../../assets/images/l2.png";
import l3 from "../../assets/images/l3.png";
import l4 from "../../assets/images/l4.png";
import l5 from "../../assets/images/l5.png";
import l6 from "../../assets/images/l6.png";
import Seo from "../../components/common/Seo";
import { CustomHeading } from "../../components/common/CustomHeading";
import Loader from "../../components/common/Loader";

// Data
const partners = [
  { id: 3, name: "l1", image: l1, width: 117 },
  { id: 4, name: "l2", image: l2, width: 110 },
  { id: 5, name: "l3", image: l3, width: 100 },
  { id: 6, name: "l4", image: l4, width: 200 },
  { id: 7, name: "l5", image: l5, width: 87 },
  { id: 8, name: "l6", image: l6, width: 200 },
];

const statsData = [
  { number: "250+", label: "Products" },
  { number: "35+", label: "Experience" },
  { number: "120+", label: "Clients" },
  { number: "99%", label: "Satisfaction Rate" },
];
const quickScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
const timelineData = {
  2015: {
    title: "The Beginning of a Vision",
    description:
      "Founded by Mr. Ajay Patel, Director of ATC Chains India. Started with a simple yet powerful idea – to design and manufacture customized stainless steel (SS) chains as per customer requirements. Built a foundation on innovation, precision, and customer trust.",
  },
  2017: {
    title: "Strengthening Capabilities",
    description:
      "Gradual expansion of production capacity to meet increasing market demand. Introduced a wider range of industrial chains and conveyor components, serving various industries across India.",
  },
  2020: {
    title: "Building for the Future",
    description:
      "Established a new, modern manufacturing facility to scale up operations. Expanded the product range to over 100 different products. Reinforced ATC Chains India’s position as a trusted name in the chain manufacturing industry.",
  },
  2022: {
    title: "Nationwide Recognition",
    description:
      "Achieved pan-India recognition for product quality and reliability. Successfully replaced several international brands with Make in India products. Increased in-house production to over 700 unique products, meeting diverse industrial needs.",
  },
  2023: {
    title: "Global Reach and Recognition",
    description:
      "Expanded internationally with a strong presence across Africa, the UAE, and other global markets. Earned global respect for delivering world-class quality at competitive pricing. Strengthened export operations, establishing ATC Chains India as a recognized global manufacturer.",
  },
  2024: {
    title: "Expanding Product Portfolio",
    description:
      "Represented ATC Chains India on the global stage through exhibitions and partnerships. Operated two advanced manufacturing facilities serving both domestic and international clients. Increased production capacity to 1,500 products, all manufactured 100% in-house.",
  },
  2025: {
    title: "Leading the Future",
    description:
      "Established a new state-of-the-art facility to bridge the growing gap between supply and demand. Continuing to lead toward becoming India’s largest and most trusted industrial chain manufacturer. Focusing on automation, sustainability, and continuous innovation to drive the next decade of growth. Vision Ahead To be India’s leading global manufacturer of industrial chains – delivering innovation, excellence, and reliability to industries worldwide.",
  },
};

// Enhanced StatCard with counter animation - keeping original UI
const AnimatedStatCard = ({ number, label, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract number and suffix
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const suffix = number.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 1200;
        const steps = 60;
        const increment = numericValue / steps;
        const stepDuration = duration / steps;
        let currentCount = 0;

        const counter = setInterval(() => {
          currentCount += increment;
          if (currentCount >= numericValue) {
            setCount(numericValue);
            clearInterval(counter);
          } else {
            setCount(Math.floor(currentCount));
          }
        }, stepDuration);

        return () => clearInterval(counter);
      }, index * 100);

      return () => clearTimeout(timer);
    }
  }, [isInView, numericValue, index]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 0, scale: 0.8, rotate: -2 }
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.3,
          delay: index * 0.05,
        }}
        className="text-center"
      >
        {/* Using original StatCard styling exactly */}
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BABEC8] mb-2">
          {count}
          {suffix}
        </div>
        <div className="text-sm md:text-base text-[#2E437C] font-medium">
          {label}
        </div>
      </motion.div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AboutUs = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2015");
  const [ourTeam, setOurTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAnimatedBefore, setHasAnimatedBefore] = useState(false);

  // Gallery states
  const [galleryImages, setGalleryImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Local storage key for animation flag
  const ANIMATION_KEY = "aboutUsAnimationCompleted";

  useEffect(() => {
    fetchTeam();
    fetchGalleryImages();
  }, []);

  // Helper function to construct full URL for images
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL}/${imagePath}`;
  };

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${import.meta.env.VITE_BACKEND_URL}/settings/ourteam`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {}

        throw new Error(errorMessage);
      }

      // Parse JSON safely
      let result;
      try {
        result = await response.json();
      } catch (parseErr) {
        throw new Error("Failed to parse server response");
      }

      if (!result || typeof result !== "object") {
        throw new Error("Unexpected response format");
      }

      setOurTeam(result.data || result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      setGalleryLoading(true);
      setGalleryError(null);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/banner`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch gallery images: ${response.status}`);
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        const activeImages = result.data
          .filter((item) => item.is_active)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => ({
            id: item.id,
            url: getImageUrl(item.imageUrl),
            alt: `Gallery image ${item.id}`,
          }));

        setGalleryImages(activeImages);

        // Show first 6 images
        setDisplayedImages(activeImages.slice(0, 6));

        // Show load more button if there are more than 6 images
        setShowLoadMore(activeImages.length > 6);
      } else {
        // If no data or invalid format, set empty arrays
        setGalleryImages([]);
        setDisplayedImages([]);
        setShowLoadMore(false);
      }
    } catch (err) {
      setGalleryError(err.message);

      // On error, set empty arrays
      setGalleryImages([]);
      setDisplayedImages([]);
      setShowLoadMore(false);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleLoadMore = () => {
    const currentCount = displayedImages.length;
    const nextImages = galleryImages.slice(currentCount, currentCount + 6);

    setDisplayedImages((prev) => [...prev, ...nextImages]);

    // Hide load more button if all images are displayed
    if (currentCount + nextImages.length >= galleryImages.length) {
      setShowLoadMore(false);
    }
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  const fadeInUp = {
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
        duration: 0.4,
      },
    },
  };

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotate: -2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    const animationCompleted = sessionStorage.getItem(ANIMATION_KEY);
    const hasAnimated = animationCompleted === "true";

    setHasAnimatedBefore(hasAnimated);

    if (videoRef.current) {
      videoRef.current.play();
    }

    if (hasAnimated) {
      setIsVideoExpanded(true);
      setShowNavbar(true);
    } else {
      // Run animation for first time
      const timer = setTimeout(() => {
        setIsVideoExpanded(true);
        // Store in sessionStorage that animation has completed
        sessionStorage.setItem(ANIMATION_KEY, "true");
      }, 1500);

      const navbarTimer = setTimeout(() => {
        setShowNavbar(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(navbarTimer);
      };
    }
  }, []);

  const currentData = timelineData[selectedYear];

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

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (galleryLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div ref={scrollContainerRef} className="overflow-hidden">
      {/* Animated Navbar */}
      <Seo
        title="About ATC Chain | Conveyor Chain & Modular Belt Manufacturer"
        description="Learn about ATC Chain, an industrial conveyor solutions manufacturer offering modular belts, slat chains, conveyor components and customized conveying solutions."
        keywords="about ATC Chain, about ATC Chains India, ATC Chain manufacturer, ATC Chains India manufacturer, conveyor chain manufacturer, conveyor chain manufacturer in India, industrial conveyor manufacturer, modular belt manufacturer, modular conveyor belt manufacturer, slat chain manufacturer, conveyor components manufacturer, industrial conveyor solutions, customized conveyor solutions, conveyor chain supplier India, conveyor belt manufacturer India, industrial conveyor chains, conveyor automation solutions, conveyor manufacturing company, ATC Chain India"
        url="https://atcchain.com/about"
        image="https://atcchain.com/images/social-preview.jpg"
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 1, y: hasAnimatedBefore ? 0 : -100 }}
        animate={
          showNavbar
            ? { opacity: 1, y: 0, scale: 1 }
            : { y: hasAnimatedBefore ? 0 : -100 }
        }
        transition={{
          duration: hasAnimatedBefore ? 0 : 0.6,
          ease: "easeInOut",
          delay: hasAnimatedBefore ? 0 : 0.2,
        }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Video Section */}
      <div className="relative h-[100vh] md:h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <motion.div
          initial={
            hasAnimatedBefore
              ? { opacity: 1, y: 0, boxShadow: "0 0 0 0px white" }
              : { opacity: 1, y: 1500, boxShadow: "0 0 0 9999px white" }
          }
          animate={
            hasAnimatedBefore
              ? { opacity: 1, y: 0, boxShadow: "0 0 0 0px white" }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: isVideoExpanded
                    ? "0 0 0 0px white"
                    : "0 0 0 9999px white",
                }
          }
          transition={{
            duration: hasAnimatedBefore ? 0 : 0.6,
            ease: "easeOut",
          }}
          className={`absolute inset-0 bg-transparent ${
            isVideoExpanded || hasAnimatedBefore
              ? "scale-110"
              : "scale-75 rounded-[15px] sm:scale-50 sm:rounded-3xl m-4"
          }`}
          style={{
            transitionDuration: hasAnimatedBefore ? "0ms" : "800ms",
            transitionTimingFunction: "ease-out",
            transitionProperty: "all",
          }}
        />

        {(isVideoExpanded || hasAnimatedBefore) && (
          <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
            <div className="max-w-7xl mx-auto w-full">
              <div className="max-w-4xl text-white overflow-hidden">
                <motion.h1
                  className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] leading-none overflow-hidden tracking-tight"
                  initial={{ opacity: 1, y: hasAnimatedBefore ? 0 : -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: hasAnimatedBefore ? 0 : 0.6,
                    ease: "easeInOut",
                    delay: hasAnimatedBefore ? 0 : 0.8,
                  }}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 500,
                    lineHeight: 0.9,
                  }}
                >
                  Who We Are
                </motion.h1>

                <motion.p
                  className="mt-4 sm:mt-5 md:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 max-w-xl md:max-w-2xl"
                  initial={{ opacity: 1, y: hasAnimatedBefore ? 0 : 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: hasAnimatedBefore ? 0 : 0.6,
                    ease: "easeInOut",
                    delay: hasAnimatedBefore ? 0 : 0.8,
                  }}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  We are team of 150+ experts leading and thriving in the
                  manufacturing industry. We build robust products and
                  machineries generated to sustain for generations.
                </motion.p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* About Quality Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-7 p-4 sm:p-5 order-1"
            variants={slideInLeft}
          >
            <SectionTitle
              title={
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CustomHeading title="Our Quality," className="font-[700]" />
                </motion.div>
              }
              subtitle={
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CustomHeading title="Our Integrity" className="font-[700]" />
                </motion.div>
              }
              description="Atcchains is always high in demand due to its wide variety of sub-products in the Plastic slat chain series, Modular belts series & conveyor components. We lead due to our consistent efforts in delivering the best suited services for our clients."
            />
          </motion.div>

          <motion.div
            className="lg:col-span-5 p-4 sm:p-5 order-2"
            variants={slideInRight}
          >
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedImage
                  src={a2}
                  alt="about-quality"
                  className="w-full h-64 sm:h-80 lg:h-[411px] rounded-lg"
                  containerClassName="rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Why ATC Chains Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          <motion.div
            className="lg:col-span-7 p-4 sm:p-5 sm:order-1 md:order-2"
            variants={slideInRight}
          >
            <SectionTitle
              title={
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CustomHeading title="Why" className="font-[700]" />
                </motion.div>
              }
              subtitle={
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CustomHeading title="Atc Chains?" className="font-[700]" />
                </motion.div>
              }
              description="One year warranty. Our policies also include accidental warranty which is provided by no other company in the world. A diverse and wide variety of 1100+ products. 24*7 available technical assistance."
            />
          </motion.div>

          <motion.div
            className="lg:col-span-5 p-4 sm:p-5 sm:order-2 md:order-1"
            variants={slideInLeft}
          >
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedImage
                  src={a1}
                  alt="why-atc-chains"
                  className="w-[391px] h-[391px] lg:w-[411px] sm:h-80 lg:h-[411px] rounded-lg object-cover"
                  containerClassName="rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-0 sm:py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 text-center"
          variants={containerVariants}
        >
          {statsData.map((stat, index) => (
            <motion.div key={index} variants={scaleInVariants}>
              <AnimatedStatCard {...stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <div className="">
          <motion.div variants={fadeInUp}>
            <SectionTitle
              title={
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CustomHeading title="Our" className="font-[700]" />
                  <CustomHeading
                    title="Team"
                    className="font-[700] text-[#BABEC8]"
                  />
                </motion.div>
              }
              alignment="center"
            />
          </motion.div>

          {loading && <p className="text-center">Loading team...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && ourTeam.length > 0 && (
            <div className="overflow-x-auto scrollbar-hide">
              <motion.div
                className="flex justify-center align-top gap-8 pb-4 min-w-max"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {ourTeam.map((member, index) => (
                  <motion.div key={index} variants={scaleInVariants}>
                    <TeamCard member={member} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* History Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-0 md:pt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <div className="">
          <motion.p
            className="font-[700] text-[16px] text-[#222222] text-center"
            variants={fadeInUp}
          >
            OUR HISTORY
          </motion.p>

          {/* Fixed text spacing for mobile */}
          <motion.div variants={fadeInUp}>
            <h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center flex flex-col"
              >
                <div className="block md:inline">
                  <CustomHeading
                    title="Foundation of excellences"
                    className="font-[600] md:font-[600] text-[30px] md:text-[48px] text-[#2E437C] md:leading-[70px]"
                  />
                </div>
                <div className="block md:inline">
                  <CustomHeading
                    title="in Industry"
                    className="font-[600] md:font-[600] text-[30px] md:text-[48px] text-[#BABEC8] leading-[40px] md:leading-[40px]"
                  />
                </div>
              </motion.div>
            </h3>
          </motion.div>
          <motion.div className="mt-4" variants={containerVariants}>
            {[
              "Founded in 2015, we deliver high-quality machines and customized belt solutions with a focus",
              "on reliability, innovation, and integrity. Guided by our founder Mr. Ajay Patel, we uphold",
              "consistency and dignity in every relationship with clients, vendors, and employees.",
            ].map((text, index) => (
              <motion.p
                key={index}
                className="text-center opacity-40"
                variants={fadeInUp}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-5 sm:p-5 p-4 order-1"
            variants={slideInLeft}
          >
            <div className="rounded-2xl border border-gray-200 text-center bg-white overflow-hidden">
              {Object.entries(timelineData).map(([year, data], index) => (
                <TimelineItem
                  key={year}
                  year={year}
                  data={data}
                  isSelected={selectedYear === year}
                  onClick={() => setSelectedYear(year)}
                  index={index}
                  isLast={index === Object.keys(timelineData).length - 1}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 sm:p-5 p-4 order-2"
            variants={slideInRight}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                className="bg-gradient-to-br rounded-2xl h-full px-6 sm:px-8 py-0 md:py-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  duration: 0.2,
                }}
              >
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#2E437C]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {currentData.title} ({selectedYear})
                  </motion.h3>

                  <motion.p
                    className="text-base sm:text-lg leading-relaxed mb-6 opacity-60"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {currentData.description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      >
        <motion.div variants={fadeInUp}>
          <SectionTitle
            title={
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <CustomHeading title="Our " className="font-[700]" />
              </motion.div>
            }
            subtitle={
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <CustomHeading title="Recent Images" className="" />
              </motion.div>
            }
            alignment="center"
          />
        </motion.div>

        {galleryLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E437C] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery images...</p>
          </div>
        )}

        {galleryError && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">
              Failed to load gallery images: {galleryError}
            </p>
          </div>
        )}

        {!galleryLoading && displayedImages.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={scaleInVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <AnimatedImage
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-40 lg:h-80"
                  containerClassName=""
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!galleryLoading && displayedImages.length === 0 && !galleryError && (
          <div className="text-center py-8">
            <p className="text-gray-500">No gallery images available.</p>
          </div>
        )}

        {showLoadMore && !galleryLoading && (
          <motion.div className="pt-16 flex justify-center" variants={fadeInUp}>
            <AnimatedButton
              icon={LuDownload}
              color={"#2E437C"}
              hoverColor={`#2E437C`}
              onClick={handleLoadMore}
            >
              Load More
            </AnimatedButton>
          </motion.div>
        )}
      </motion.div>

      {/* Partners Section */}
      <motion.div
        className="our-client-section fade-in-section py-15"
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="">
          {/* <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 px-14 mx-auto container"
          >
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-start">
              <span className="text-[#2E437C]">
                <CustomHeading title="Our" className="" />
              </span>
              <span className="text-[#BABEC8]">
                <CustomHeading title="Clients" className="" />
              </span>
            </motion.h2>
          </motion.div> */}

          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="flex">
              {[1, 2].map((set) => (
                <motion.div
                  key={set}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-shrink-0 items-center  "
                >
                  {partners.map((partner) => (
                    <motion.div
                      key={`${set}-${partner.id}`}
                      className="flex-shrink-0 mx-15 px-0 md:px-5"
                      whileHover={{
                        scale: 1.05,

                        transition: { duration: 0.1 },
                      }}
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-12 sm:h-16 lg:h-20 object-contain transition-all duration-150"
                        style={{ maxWidth: `${partner.width}px` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
