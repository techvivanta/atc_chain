import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";

export default function CateComponent2() {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Empty animations array - no animations applied to icons
  const animationTypes = [];

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/product/category/`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          result.message === "Categories fetched successfully" &&
          result.data
        ) {
          // Transform API data and sort by displayOrder
          const transformedSolutions = result.data
            .filter((category) => category.is_active) // Only show active categories
            .sort((a, b) => a.displayOrder - b.displayOrder) // Sort by displayOrder ascending
            .map((category, index) => ({
              id: category.id,
              title: category.name.toUpperCase(),
              icon: `${import.meta.env.VITE_BACKEND_URL}/${category.image}`,
              description: category.description,
              animation: null, // No animation applied
              displayOrder: category.displayOrder,
              is_active: category.is_active,
              created_at: category.created_at,
              updated_at: category.updated_at,
            }));

          setSolutions(transformedSolutions);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category click navigation
  const handleCategoryClick = (categoryId) => {
    window.location.href = `/products?category=${categoryId}`;
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E437C]"></div>
        <p className="ml-4 text-gray-600">Loading solutions...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load solutions: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2E437C] text-white px-6 py-2 rounded-lg hover:bg-[#1d3b72] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardGridVariants}
            className="grid grid-cols-2 custom-gap sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 w-full h-[35rem]"
          >
            {solutions.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => handleCategoryClick(item.id)}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
                className="group relative flex flex-col items-center justify-center p-2 bg-white
          cursor-pointer overflow-hidden hover:shadow-lg hover:bg-[#1d3b72]"
              >

                {/* Icon without any continuous animation */}
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
                  <img
                    src={`${item.icon}`}
                    alt={item.title}
                    className="w-full h-full object-contain transition-all duration-300
             group-hover:brightness-0 group-hover:invert"
                    onError={(e) => {
                      // Fallback for broken images
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                    }}
                  />
                </div>

                {/* Title from API */}
                <motion.p
                  className="relative z-10 text-[10px] font-medium
           text-gray-700 group-hover:text-white transition-colors duration-300
           text-center leading-tight max-w-full"
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  style={{textTransform:"capitalize"}}
                >
                  {item.title}
                </motion.p>

                {/* Bottom Border */}
               
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </>
  );
}
