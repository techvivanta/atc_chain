import React from "react";
import { motion } from "framer-motion";
import productImage from "../../assets/images/productdefault.png";

const SubcategoryCards = ({ subcategories, onSubcategoryClick, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E437C] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading subcategories...</p>
      </div>
    );
  }

  if (subcategories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No subcategories found
        </h3>
        <p className="text-gray-400">
          This category doesn't have any subcategories available
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {subcategories.filter(item => item.is_active !== false).sort((a,b) => a.displayOrder - b.displayOrder).map((subcategory, index) => (
        <motion.div
          key={subcategory.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => onSubcategoryClick(subcategory)}
          className={subcategory.is_active === false ? "d-none" : "flex flex-col items-start text-start cursor-pointer bg-white"}
        >
          <div className="aspect-[4/4] w-full overflow-hidden">
            <motion.img
              src={
                subcategory.image && subcategory.image.startsWith("http")
                  ? subcategory.image
                  : subcategory.image
                  ? `${import.meta.env.VITE_BACKEND_URL}/${subcategory.image}`
                  : productImage
              }
              alt={subcategory.name}
              className="w-full min-w-full object-cover p-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <h2 className="text-[16px] font-[400] mt-3 text-gray-800">
            {subcategory.name}
          </h2>
          {subcategory.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {subcategory.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SubcategoryCards;
