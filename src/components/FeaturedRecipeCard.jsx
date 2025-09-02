import React, { useState } from "react";
import { Heart, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
const FeaturedRecipeCard = ({ meal, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md"
        >
          <Heart
            className={`${
              isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
            size={20}
          />
        </motion.button>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          Featured
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300 font-nunito line-clamp-2">
          {meal.strMeal}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center text-gray-600 text-sm">
            <Clock size={16} className="mr-1" />
            25-30 mins
          </span>
          <div className="flex items-center text-yellow-500">
            <Star size={16} className="mr-1 fill-yellow-500" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            window.open(
              `https://www.themealdb.com/meal/${meal.idMeal}`,
              "_blank"
            )
          }
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md font-poppins"
        >
          Try This Recipe
        </motion.button>
      </div>
    </motion.div>
  );
};
export default FeaturedRecipeCard;
