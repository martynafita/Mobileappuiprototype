import { Heart, Home, Search, User, Settings, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

const allContentCards = [
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
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1080",
    title: "Fashion Vibes",
    description: "Latest trends in contemporary fashion",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1080",
    title: "Music Festival",
    description: "Experience the best live performances",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1080",
    title: "Fitness Goals",
    description: "Your journey to a healthier lifestyle",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080",
    title: "Tech Innovation",
    description: "Exploring the future of technology",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1080",
    title: "Artistry",
    description: "Creative expressions and inspiration",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1080",
    title: "Travel Dreams",
    description: "Discover breathtaking destinations",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1080",
    title: "Coffee Culture",
    description: "The art of brewing perfection",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1080",
    title: "Cinema Magic",
    description: "Behind the scenes of filmmaking",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1080",
    title: "Reading Corner",
    description: "Get lost in amazing stories",
  },
];

export function MainFeedScreen() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [displayedCards, setDisplayedCards] = useState(6);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
        setDisplayedCards(prev => Math.min(prev + 3, allContentCards.length * 10));
      }
    };

    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const getInfiniteCards = () => {
    const cards = [];
    const repeats = Math.ceil(displayedCards / allContentCards.length);
    for (let i = 0; i < repeats; i++) {
      cards.push(...allContentCards.map(card => ({ ...card, id: card.id + (i * allContentCards.length) })));
    }
    return cards.slice(0, displayedCards);
  };

  const contentCards = getInfiniteCards();
  const filteredCards = showFavorites
    ? contentCards.filter(card => likes[card.id])
    : searchQuery
    ? contentCards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contentCards;

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto transition-colors ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Section */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <h1 className={`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
          {showFavorites ? 'Favorites' : 'For You'}
        </h1>
        <div className="flex gap-4">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Settings"
            onClick={() => setShowSettings(true)}
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
      <div
        id="scroll-container"
        className="flex-1 overflow-y-auto px-6 pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="space-y-5">
          {filteredCards.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {showFavorites ? 'No favorites yet. Start liking posts!' : 'No results found'}
              </p>
            </div>
          ) : (
            filteredCards.map((card) => (
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
            ))
          )}
        </div>
      </div>

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-end max-w-md mx-auto">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSettings(false)}
          />
          <div className={`relative w-full rounded-t-3xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}>Settings</h2>
              <button onClick={() => setShowSettings(false)}>
                <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
            </div>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Account Settings</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Notifications</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Privacy</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Help & Support</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 max-w-md mx-auto">
          <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex items-center gap-4 px-6 pt-8 pb-4">
              <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-full ${
                  isDark ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-500'
                }`}
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4">
                {searchQuery ? (
                  filteredCards.length > 0 ? (
                    filteredCards.slice(0, 10).map((card) => (
                      <div
                        key={card.id}
                        className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                      >
                        <h3 className={`text-sm mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{card.title}</h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{card.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className={`text-sm text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      No results found
                    </p>
                  )
                ) : (
                  <p className={`text-sm text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Start typing to search
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-around px-6 py-4">
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Home"
            onClick={() => setShowFavorites(false)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              !showFavorites ? 'bg-purple-500' : isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Home className={`w-5 h-5 ${!showFavorites ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Search"
            onClick={() => setShowSearch(true)}
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
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              showFavorites ? 'bg-purple-500' : isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Heart className={`w-5 h-5 ${showFavorites ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            aria-label="Profile"
            onClick={() => navigate("/personalize")}
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