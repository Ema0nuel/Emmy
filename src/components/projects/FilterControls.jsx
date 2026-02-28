import React from "react";
import { motion } from "framer-motion";

const FilterControls = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  const categories = ["All", "Full Stack", "Real-time", "Backend", "Frontend"];
  const sorts = ["Most Recent", "Featured"];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="w-full py-8 px-6 sticky top-20 z-40 backdrop-blur-md bg-white/30 border-b border-white/20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "glass-card-pillar glass-card-pillar-hover border-white/40 shadow-lg"
                    : "glass-element border border-white/30 hover:glass-element"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Sort options */}
          <motion.div
            className="flex gap-3 justify-start md:justify-end"
            variants={containerVariants}
          >
            {sorts.map((sort) => (
              <motion.button
                key={sort}
                onClick={() => onSortChange(sort)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  sortBy === sort
                    ? "glass-card-pillar glass-card-pillar-hover border-white/40 shadow-lg"
                    : "glass-element border border-white/30 hover:glass-element"
                }`}
              >
                {sort}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FilterControls;
