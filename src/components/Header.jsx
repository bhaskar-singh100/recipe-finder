import React from "react";
import { ChefHat, Utensils } from "lucide-react";
import { motion } from "framer-motion";

// Header Component
const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center py-12 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl mb-8 shadow-lg"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex justify-center items-center mb-4"
      >
        <ChefHat className="text-green-600 mr-3" size={48} />
        <h1 className="text-5xl font-bold text-gray-800 font-nunito">
          Recipe Finder
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl text-gray-600 flex items-center justify-center"
      >
        <Utensils className="mr-2 text-yellow-600" size={20} />
        Discover delicious recipes with your favorite ingredients
      </motion.p>
    </motion.header>
  );
};

export default Header;
