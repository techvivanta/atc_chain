import React from "react";
import { motion } from "framer-motion";
import next1 from "../../assets/images/next1.jpg";
import { CustomHeading } from "../common/CustomHeading";
import usePosts from "../../hooks/usePosts"; // Import your hook
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

export default function Gatherings() {
  const navigate = useNavigate();
  // Use your hook to fetch events
  const { posts: events, loading, error } = usePosts("settings/post/event");

  // Helper function to format date for display
  const formatEventDate = (dateTimeString) => {
    if (!dateTimeString) return "TBA";

    try {
      // Extract start date from "2025-09-27 09:00 to 2025-09-27 12:00" format
      const startDateTime = dateTimeString.split(" to ")[0];
      const date = new Date(startDateTime);

      const month = date
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase();
      const day = date.getDate();

      return `${month} ${day}`;
    } catch (error) {
      return "TBA";
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return next1; // Fallback image
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL}/${imagePath}`;
  };

  // Show only latest 4 events
  const displayEvents = events.slice(0, 4);

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

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  // const cardVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 30,
  //     scale: 0.95,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 200,
  //       damping: 20,
  //       duration: 0.5,
  //     },
  //   },
  // };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
  };

  const cardHover = {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(46, 67, 124, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
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

  // Helper function to format date from event.date (assuming it's in format like "2025-09-27")
  const formatDateFromEvent = (dateString) => {
    if (!dateString) return { month: "TBA", day: "" };

    try {
      // Extract date part (assuming format like "2025-09-27 09:00 to 2025-09-27 12:00" or "2025-09-27")
      const datePart = dateString.split(" ")[0];
      const date = new Date(datePart);

      const month = date
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase();
      const day = date.getDate();

      return { month, day };
    } catch (error) {
      return { month: "TBA", day: "" };
    }
  };

  if (loading) {
    return (
      <section className="w-full px-4 md:px-10 lg:px-15 py-10">
        <div className="container mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E437C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading upcoming events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 md:px-10 lg:px-15 py-10">
        <div className="container mx-auto text-center py-20">
          <p className="text-red-500 mb-4">Failed to load events: {error}</p>
        </div>
      </section>
    );
  }

  // Don't render if no events
  if (displayEvents.length === 0) {
    return (
      <section className="w-full px-4 md:px-10 lg:px-15 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="container mx-auto mb-5 sm:mb-10 sm:px-6 lg:px-0 pb-1 md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px] leading-17 md:leading-17">
            <CustomHeading
              title="What's "
              className="font-bold text-[#2E437C] block"
            />
            <br />
            <CustomHeading
              title="Happening Next"
              className="font-bold text-[#BABEC8] block"
            />
          </h1>

          <motion.p
            className="text-[#191919] mt-6 text-[20px] sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Stay connected with our latest gatherings and innovations
          </motion.p>
        </motion.div>
        <div className="container mx-auto text-center py-10">
          <p className="text-gray-500">No upcoming events at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <section className="container mx-auto w-full px-4 md:px-10 lg:px-15 py-10 bg-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="container mx-auto mb-0 sm:px-6 lg:px-0 pb-1 md:text-left"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px] leading-[50px] md:leading-[80px]">
                <CustomHeading
                  title="What's "
                  className="font-bold text-[#2E437C] block"
                />
                <br />
                <CustomHeading
                  title="Happening Next"
                  className="font-bold text-[#BABEC8] block"
                />
              </h2>

              <motion.h2
                className="text-[#191919] my-2  text-[20px] sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Stay connected with our latest gatherings and innovations
              </motion.h2>
            </motion.div>

            {/* Mobile: Horizontal scroll showing 2 cards at a time */}
            <motion.div
              className="md:hidden overflow-x-auto pb-4 scrollbar-hide"
              variants={cardGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex gap-4 w-max">
                {displayEvents.map((event, index) => (
                  <motion.div
                    key={`mobile-${event.id}`}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      ...cardVariants,
                      visible: {
                        ...cardVariants.visible,
                        transition: {
                          ...cardVariants.visible.transition,
                          delay: index * 0.1,
                        },
                      },
                    }}
                    onClick={() => navigate(`/news/details/${event.slug || event.id}`)}
                    className="group overflow-hidden bg-white hover:bg-[#D8DEEE] border-b-2 border-transparent hover:border-b-2 hover:border-[#2E437C] transition-shadow duration-300 cursor-pointer w-[calc(50vw-32px)] flex-shrink-0"
                  >
                    <motion.div className="relative">
                      {/* Image container with 3:4 aspect ratio */}
                      <div className="overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden">
                          <motion.img
                            src={getImageUrl(event.image)}
                            alt={event.heading || event.name}
                            variants={imageVariants}
                            className="w-full h-full object-cover p-2"
                            onError={(e) => {
                              e.target.src = next1;
                            }}
                          />
                        </div>
                      </div>

                      <motion.div
                        className="flex items-center gap-3 p-3"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="bg-gray-100 w-12 h-12 flex flex-col items-center justify-center"
                          whileHover={{
                            backgroundColor: "#2E437C",
                            color: "#FFFFFF",
                            transition: { duration: 0.3 },
                          }}
                        >
                          {(() => {
                            const { month, day } = formatDateFromEvent(
                              event.date
                            );
                            return (
                              <>
                                <p className="text-[10px] font-medium leading-tight">
                                  {month}
                                </p>
                                <p className="text-sm font-semibold leading-tight">
                                  {day}
                                </p>
                              </>
                            );
                          })()}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <motion.h3
                            className="font-[600] text-[14px] line-clamp-2"
                            whileHover={{ color: "#2E437C" }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.heading || event.name || "Event"}
                          </motion.h3>
                          <p className="text-[11px] opacity-[60%] truncate">
                            {event.location || "Location TBA"}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Desktop: Grid layout */}
            <motion.div
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              variants={cardGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {displayEvents.map((event, index) => (
                <motion.div
                  key={`desktop-${event.id}`}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    ...cardVariants,
                    visible: {
                      ...cardVariants.visible,
                      transition: {
                        ...cardVariants.visible.transition,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  onClick={() => navigate(`/news/details/${event.slug || event.id}`)}
                  className="group overflow-hidden bg-white hover:bg-[#D8DEEE] border-b-2 border-transparent hover:border-b-2 hover:border-[#2E437C] transition-shadow duration-300 cursor-pointer"
                >
                  <motion.div className="relative">
                    {/* Image container with 3:4 aspect ratio */}
                    <div className="overflow-hidden">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <motion.img
                          src={getImageUrl(event.image)}
                          alt={event.heading || event.name}
                          variants={imageVariants}
                          className="w-full h-full object-cover p-2"
                          onError={(e) => {
                            e.target.src = next1; // Fallback to default image
                          }}
                        />
                      </div>
                    </div>

                    <motion.div
                      className="flex items-center gap-4 p-4"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="bg-gray-100 w-14 h-14 flex flex-col items-center justify-center"
                        whileHover={{
                          backgroundColor: "#2E437C",
                          color: "#FFFFFF",
                          transition: { duration: 0.3 },
                        }}
                      >
                        {(() => {
                          const { month, day } = formatDateFromEvent(
                            event.date
                          );
                          return (
                            <>
                              <p className="text-[11px] font-medium leading-tight">
                                {month}
                              </p>
                              <p className="text-base font-semibold leading-tight">
                                {day}
                              </p>
                            </>
                          );
                        })()}
                      </motion.div>

                      <div className="flex-1">
                        <motion.h3
                          className="font-[600] text-[16px] md:text-base line-clamp-2"
                          whileHover={{ color: "#2E437C" }}
                          transition={{ duration: 0.2 }}
                        >
                          {event.heading || event.name || "Event"}
                        </motion.h3>
                        <p className="text-[12px] opacity-[60%] truncate">
                          {event.location || "Location TBA"}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile scroll indicator */}
            <div className="md:hidden flex justify-center mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>←</span>
                <span>Swipe to see more events</span>
                <span>→</span>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
