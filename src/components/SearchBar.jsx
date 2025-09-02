import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";

import { Search } from "lucide-react";
const SearchBar = ({ onSearch, loading }) => {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = () => {
    if (ingredient.trim()) {
      onSearch(ingredient.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an ingredient (e.g., chicken, tomato, pasta...)"
            className="w-full px-6 py-4 text-lg border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors duration-300 bg-white shadow-md font-poppins"
            disabled={loading}
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={loading || !ingredient.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg font-poppins"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            "Find Recipes"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
