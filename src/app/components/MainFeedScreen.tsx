import { Heart, Home, Search, User, Settings, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

export function MainFeedScreen() {
  const { isDark, toggleTheme } = useTheme();
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const contentCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWZlc3R5bGUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzc2MjIzNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Modern Lifestyle",
      description: "Discover the latest trends in minimal living",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1737548990135-d0a6c80fcfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBzdHJlZXR8ZW58MXx8fHwxNzc2MjU1NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Street Fashion",
      description: "Urban style inspiration for your wardrobe",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1510873660878-bdf8de0ed851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzc2MTk3NjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Creative Space",
      description: "Transform your workspace into a haven",
    },
  ];

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto transition-colors ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Section */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <h1 className={`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>For You</h1>
        <div className="flex gap-4">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Settings"
          >
            <Settings className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Middle Section - Content Cards */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-5">
          {contentCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-3xl shadow-sm border overflow-hidden ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{card.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{card.description}</p>
                  </div>
                  <button
                    className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDark ? 'bg-purple-900/30 hover:bg-purple-900/50' : 'bg-purple-50 hover:bg-purple-100'
                    }`}
                    aria-label="Like"
                    onClick={() => setLikes({ ...likes, [card.id]: !likes[card.id] })}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likes[card.id] ? "text-purple-500" : isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-around px-6 py-4">
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Home"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Search"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Favorites"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Heart className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Profile"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <User className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}