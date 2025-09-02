import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ChefHat, Utensils } from "lucide-react";
import RecipeCard from "./RecipeCard";
const RecipeGrid = ({
  recipes,
  loading,
  error,
  hasSearched,
  onBackToBrowse,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mb-4"></div>
        <p className="text-gray-600 text-lg font-poppins">
          Searching for delicious recipes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-red-50 rounded-2xl"
      >
        <div className="text-red-500 mb-4">
          <Utensils size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-red-700 mb-2 font-nunito">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 font-poppins">{error}</p>
      </motion.div>
    );
  }

  if (!hasSearched) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
      >
        <div className="text-blue-500 mb-4">
          <ChefHat size={64} className="mx-auto" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2 font-nunito">
          Ready to Cook?
        </h3>
        <p className="text-gray-600 font-poppins">
          Enter an ingredient above to discover amazing recipes!
        </p>
      </motion.div>
    );
  }

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-yellow-50 rounded-2xl"
      >
        <div className="text-yellow-500 mb-4">
          <Search size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2 font-nunito">
          No Recipes Found
        </h3>
        <p className="text-gray-600 font-poppins mb-6">
          Try searching with a different ingredient!
        </p>
        {onBackToBrowse && (
          <button
            onClick={onBackToBrowse}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg font-poppins font-medium"
          >
            ← Back to Browse
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <AnimatePresence>
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipeGrid;
