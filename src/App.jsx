import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChefHat, Utensils, Heart, Clock } from "lucide-react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import FeaturedSection from "./components/FeaturedSection";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchRecipes = async (ingredient) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setSearchTerm(ingredient);

    // Scroll to results section
    setTimeout(() => {
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          ingredient
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBrowse = () => {
    setHasSearched(false);
    setRecipes([]);
    setSearchTerm("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-yellow-50">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Nunito:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        <SearchBar onSearch={searchRecipes} loading={loading} />

        {!hasSearched && <FeaturedSection onIngredientSearch={searchRecipes} />}

        <div id="results-section">
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-nunito">
                Search Results for "{searchTerm}"
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full mb-6"></div>
            </motion.div>
          )}

          <RecipeGrid
            recipes={recipes}
            loading={loading}
            error={error}
            hasSearched={hasSearched}
            onBackToBrowse={handleBackToBrowse}
          />
        </div>

        {hasSearched && recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <button
              onClick={handleBackToBrowse}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg font-poppins font-medium"
            >
              ← Back to Browse
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center py-8 border-t border-green-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <ChefHat className="text-green-600 mr-2" size={24} />
              <span className="text-gray-700 font-semibold font-nunito">
                Recipe Finder
              </span>
            </div>
            <p className="text-gray-600 font-poppins">
              Made with <Heart className="inline text-red-500 mx-1" size={16} />{" "}
              for food lovers everywhere
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-poppins">
              Powered by TheMealDB API • © 2025 Recipe Finder
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
        .font-nunito {
          font-family: "Nunito", sans-serif;
        }
        .bg-cream-50 {
          background-color: #fefcf7;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;
