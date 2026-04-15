import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, ShoppingBag, ArrowRight, Info } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "The Cabin Pro",
    tagline: "The ultimate breeze-through-security companion.",
    image: "https://mokobara.com/cdn/shop/files/The-Cabin-Pro_2.0-1_188d0582-f9ff-45de-a9b7-508a4d4335d6.jpg?width=1200",
  },
  {
    id: 2,
    name: "The Transit Backpack",
    tagline: "Designed for humans who move.",
    image: "https://mokobara.com/cdn/shop/files/TheTransitBackpack30L_CryptoSunray1_baac0fd7-c46e-462a-a914-cdc2813befa2.webp?width=1200",
  },
  {
    id: 3,
    name: "The Overnighter",
    tagline: "Packs like a suitcase, carries like a backpack.",
    image: "https://mokobara.com/cdn/shop/files/TheOvernighterBackpack-01.jpg?width=1200",
  },
  {
    id: 4,
    name: "The Aisle Trunk",
    tagline: "Maximum volume, minimal stress.",
    image: "https://mokobara.com/cdn/shop/files/The-Aisle-Trunk_Check-in_Shy-Blue-1.jpg?width=1200",
  },
  {
    id: 5,
    name: "The Daily Backpack",
    tagline: "Your daily ritual, elevated.",
    image: "https://mokobara.com/cdn/shop/products/The-Backpack_DD-1-New.webp?width=1200",
  },
  {
    id: 6,
    name: "The Check-in Luggage",
    tagline: "Indestructible. Lightweight. Silent.",
    image: "https://mokobara.com/cdn/shop/files/The-Check-in-Luggage-1_1_ad726d9d-5c1b-4df0-9a85-1ce67bb67205.jpg?width=1200",
  },
  {
    id: 7,
    name: "The Weekender",
    tagline: "Short trips, big style.",
    image: "https://mokobara.com/cdn/shop/files/Bootcamp-Ocean-1.jpg?width=1200",
  },
  {
    id: 8,
    name: "The Briefcase",
    tagline: "The modern professional's power move.",
    image: "https://mokobara.com/cdn/shop/products/The-Briefcase_EY-1.jpg?width=1200",
  },
  {
    id: 9,
    name: "The Work Backpack",
    tagline: "Sophistication meets functionality.",
    image: "https://mokobara.com/cdn/shop/files/The-Work-Backpack_2.0-Crypto-1_bb460c16-5301-4814-aed4-5f6ddfeae11b.jpg?width=1200",
  },
  {
    id: 10,
    name: "The Daily Tote",
    tagline: "Everything you need, in one place.",
    image: "https://mokobara.com/cdn/shop/files/The-Easy-Going-Tote-Coconut-Cream-1_9336e443-6f6a-4b58-9ea9-e4ac114806a7.jpg?width=1200",
  }
];

const MobileProductViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookmarked, setBookmarked] = useState(new Set());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentProduct = products[currentIndex];

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mokobara-bookmarks');
    if (saved) {
      try {
        setBookmarked(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load bookmarks:', e);
      }
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('mokobara-bookmarks', JSON.stringify(Array.from(bookmarked)));
  }, [bookmarked]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleShuffle();
      }
    }
  };

  const handleShuffle = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAnimating(false);
    }, 300);
  };

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarked);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarked(newBookmarks);
  };

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="w-full h-screen bg-black font-sans relative overflow-hidden">
      {/* Screen */}

        {/* Full Bleed Image Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className={`w-full h-full transition-all duration-300 ease-in-out transform ${
              isAnimating ? 'scale-110 blur-sm opacity-40' : 'scale-100 blur-0 opacity-100'
            }`}
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
            {/* Vignetting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>
        </div>

        {/* Top UI Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <img
            src="https://mokobara.com/cdn/shop/files/Mokobara-logo-R.png?v=1693389220&width=1920"
            alt="Mokobara"
            className="h-16 sm:h-28 w-auto"
          />
        </div>

        {/* Compact Bottom UI HUD */}
        <div className={`absolute bottom-0 left-0 w-full px-2.5 py-2.5 sm:px-5 sm:py-3 pb-24 sm:pb-32 transition-all duration-300 ${
          isAnimating ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
        }`}>

          {/* Product Glance Info */}
          <div className="mb-6 sm:mb-8 flex justify-between items-start gap-2">
            <div className="flex-1">
              <h2 className="text-white text-lg sm:text-2xl font-bold tracking-tight mb-1 leading-tight">
                {currentProduct.name}
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-medium italic leading-tight">
                {currentProduct.tagline}
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic();
                toggleBookmark(currentProduct.id);
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 transition-transform active:scale-75 flex-shrink-0"
            >
              <Bookmark
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${bookmarked.has(currentProduct.id) ? 'fill-white text-white' : 'text-white/60'}`}
              />
            </button>
          </div>

          {/* Actions - Grouped and Compact */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              onClick={() => {
                triggerHaptic();
                handleShuffle();
              }}
              className="w-full bg-white text-black h-10 sm:h-12 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 active:bg-zinc-200 shadow-lg"
            >
              ANOTHER ONE
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <div className="flex gap-1 sm:gap-1.5">
              <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white h-10 sm:h-12 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors active:bg-white/20">
                GET NOW
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button className="w-10 sm:w-12 bg-white/10 backdrop-blur-md border border-white/20 text-white h-10 sm:h-12 rounded-lg flex items-center justify-center active:bg-white/20">
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60" />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MobileProductViewer;
