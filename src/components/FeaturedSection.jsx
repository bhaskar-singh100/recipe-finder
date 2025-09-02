import React, { useEffect, useState } from "react";
import { Globe, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import FeaturedRecipeCard from "./FeaturedRecipeCard";

const FeaturedSection = ({ onIngredientSearch }) => {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        // Fetch random meals for featured section
        const featuredPromises = Array(6)
          .fill()
          .map(() =>
            fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
              (res) => res.json()
            )
          );

        // Fetch categories
        const categoriesPromise = fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        ).then((res) => res.json());

        const [featuredResults, categoriesResult] = await Promise.all([
          Promise.all(featuredPromises),
          categoriesPromise,
        ]);

        const meals = featuredResults
          .map((result) => result.meals[0])
          .filter(Boolean);
        setFeaturedMeals(meals);
        setCategories(categoriesResult.categories?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  const popularIngredients = [
    { name: "Chicken", icon: "🍗", color: "from-yellow-400 to-orange-400" },
    { name: "Beef", icon: "🥩", color: "from-red-400 to-red-600" },
    { name: "Pasta", icon: "🍝", color: "from-yellow-300 to-yellow-500" },
    { name: "Rice", icon: "🍚", color: "from-green-300 to-green-500" },
    { name: "Fish", icon: "🐟", color: "from-blue-400 to-blue-600" },
    { name: "Potato", icon: "🥔", color: "from-yellow-600 to-yellow-700" },
  ];

  return (
    <div className="mb-16">
      {/* Popular Ingredients */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-nunito flex items-center justify-center">
            <TrendingUp className="mr-3 text-green-600" size={32} />
            Popular Ingredients
          </h2>
          <p className="text-gray-600 font-poppins">
            Quick search for trending ingredients
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularIngredients.map((ingredient, index) => (
            <motion.button
              key={ingredient.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onIngredientSearch(ingredient.name.toLowerCase())}
              className={`bg-gradient-to-r ${ingredient.color} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 font-poppins font-medium`}
            >
              <div className="text-2xl mb-2">{ingredient.icon}</div>
              <div className="text-sm">{ingredient.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-nunito flex items-center justify-center">
            <Globe className="mr-3 text-blue-600" size={32} />
            Browse by Category
          </h2>
          <p className="text-gray-600 font-poppins">
            Explore different cuisine types
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Array(8)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-24"
                ></div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.idCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <CategoryCard
                  category={category}
                  onClick={onIngredientSearch}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Featured Recipes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-nunito flex items-center justify-center">
            <Star className="mr-3 text-yellow-600" size={32} />
            Featured Recipes
          </h2>
          <p className="text-gray-600 font-poppins">
            Handpicked delicious meals just for you
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-2xl h-80"
                ></div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMeals.map((meal, index) => (
              <FeaturedRecipeCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default FeaturedSection;
