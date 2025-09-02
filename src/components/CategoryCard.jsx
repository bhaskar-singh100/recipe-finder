import React from "react";
import { motion } from "framer-motion";
const CategoryCard = ({ category, onClick }) => {
  const categoryIcons = {
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🐑",
    Miscellaneous: "🍽️",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦐",
    Side: "🥗",
    Starter: "🥙",
    Vegan: "🌱",
    Vegetarian: "🥬",
    Breakfast: "🍳",
    Goat: "🐐",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(category.strCategory)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group border-2 border-transparent hover:border-green-200"
    >
      <div className="text-center">
        <div className="text-4xl mb-3">
          {categoryIcons[category.strCategory] || "🍴"}
        </div>
        <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300 font-nunito">
          {category.strCategory}
        </h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
