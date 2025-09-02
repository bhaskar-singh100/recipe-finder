import React from "react";
import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";
const RecipeCard = ({ recipe, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md"
        >
          <Heart className="text-red-500" size={20} />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300 font-nunito">
          {recipe.strMeal}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center text-gray-600 text-sm">
            <Clock size={16} className="mr-1" />
            Ready in 30 mins
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Delicious
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            window.open(
              `https://www.themealdb.com/meal/${recipe.idMeal}`,
              "_blank"
            )
          }
          className="w-full bg-gradient-to-r from-yellow-400 to-red-400 text-white font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-red-500 transition-all duration-300 shadow-md font-poppins"
        >
          View Recipe
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
