import { Dumbbell, Gamepad2, Music, Shirt, Smartphone, Palette, Camera, Book, Plane, Coffee, Film, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";

const interests = [
  { id: "music", label: "Music", icon: Music },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "technology", label: "Technology", icon: Smartphone },
  { id: "fashion", label: "Fashion", icon: Shirt },
  { id: "art", label: "Art", icon: Palette },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "books", label: "Books", icon: Book },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "movies", label: "Movies", icon: Film },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function PersonalizationScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto transition-colors ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Section */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-start justify-between mb-3">
          <h1 className={`text-3xl flex-1 ${isDark ? 'text-white' : 'text-black'}`}>Customize your experience</h1>
          <button
            onClick={() => navigate("/")}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Close"
          >
            <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Select topics you're interested in to personalize your feed
        </p>
      </div>

      {/* Middle Section - Interest Grid */}
      <div className="flex-1 px-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="grid grid-cols-2 gap-4 pb-32">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = selected.includes(interest.id);

            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  rounded-2xl p-6 transition-all duration-200
                  ${
                    isSelected
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-200"
                      : isDark 
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    ${isSelected ? "bg-white/20" : isDark ? "bg-gray-700" : "bg-white"}
                  `}
                  >
                    <Icon
                      className={`w-7 h-7 ${isSelected ? "text-white" : "text-purple-500"}`}
                    />
                  </div>
                  <span className="text-sm">{interest.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Continue Button */}
      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-6 border-t ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`
            w-full py-4 rounded-full transition-all duration-200
            ${
              selected.length > 0
                ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-200"
                : isDark
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}