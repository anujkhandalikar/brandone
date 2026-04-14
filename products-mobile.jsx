import React, { useState, useRef, useEffect } from 'react';

const products = [
  {
    id: 1,
    name: "The Cabin Pro",
    tagline: "The ultimate breeze-through-security companion.",
    utility: "A dedicated hard-shell front compartment for instant tech access and built-in charging.",
    image: "https://mokobara.com/cdn/shop/files/The-Cabin-Pro_2.0-1_188d0582-f9ff-45de-a9b7-508a4d4335d6.jpg?width=1200",
  },
  {
    id: 2,
    name: "The Transit Backpack",
    tagline: "Designed for humans who move.",
    utility: "180° clamshell opening that makes airport security a total non-event.",
    image: "https://mokobara.com/cdn/shop/files/TheTransitBackpack30L_CryptoSunray1_baac0fd7-c46e-462a-a914-cdc2813befa2.webp?width=1200",
  },
  {
    id: 3,
    name: "The Overnighter",
    tagline: "Packs like a suitcase, carries like a backpack.",
    utility: "Featuring a detachable sling bag for quick, hands-free exploring once you arrive.",
    image: "https://mokobara.com/cdn/shop/files/TheOvernighterBackpack-01.jpg?width=1200",
  },
  {
    id: 4,
    name: "The Aisle Trunk",
    tagline: "Maximum volume, minimal stress.",
    utility: "A unique 70/30 split design that provides extra depth for your bulkier travel essentials.",
    image: "https://mokobara.com/cdn/shop/files/The-Aisle-Trunk_Check-in_Shy-Blue-1.jpg?width=1200",
  },
  {
    id: 5,
    name: "The Daily Backpack",
    tagline: "Your daily ritual, elevated.",
    utility: "Body-blended magnetic pocket ensures your passport and phone are always secure.",
    image: "https://mokobara.com/cdn/shop/products/The-Backpack_DD-1-New.webp?width=1200",
  },
  {
    id: 6,
    name: "The Check-in Luggage",
    tagline: "Indestructible. Lightweight. Silent.",
    utility: "Equipped with Japanese Hinomoto wheels that glide silently across any airport surface.",
    image: "https://mokobara.com/cdn/shop/files/The-Check-in-Luggage-1_1_ad726d9d-5c1b-4df0-9a85-1ce67bb67205.jpg?width=1200",
  },
  {
    id: 7,
    name: "The Weekender",
    tagline: "Short trips, big style.",
    utility: "A separate ventilated shoe compartment keeps your fresh laundry truly fresh.",
    image: "https://mokobara.com/cdn/shop/files/Bootcamp-Ocean-1.jpg?width=1200",
  },
  {
    id: 8,
    name: "The Briefcase",
    tagline: "The modern professional's power move.",
    utility: "Slim, structured profile with intelligent organization for all your tech and chargers.",
    image: "https://mokobara.com/cdn/shop/products/The-Briefcase_EY-1.jpg?width=1200",
  },
  {
    id: 9,
    name: "The Work Backpack",
    tagline: "Sophistication meets functionality.",
    utility: "Crafted with water-resistant nylon and vegan leather for a durable, premium finish.",
    image: "https://mokobara.com/cdn/shop/files/The-Work-Backpack_2.0-Crypto-1_bb460c16-5301-4814-aed4-5f6ddfeae11b.jpg?width=1200",
  },
  {
    id: 10,
    name: "The Daily Tote",
    tagline: "Everything you need, in one place.",
    utility: "Features a reinforced structure and a padded sleeve for your 14-inch laptop.",
    image: "https://mokobara.com/cdn/shop/files/The-Easy-Going-Tote-Coconut-Cream-1_9336e443-6f6a-4b58-9ea9-e4ac114806a7.jpg?width=1200",
  }
];

const MobileProductViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentProduct = products[currentIndex];

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
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageError(false);
    setImageLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageError(false);
    setImageLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsAnimating(false);
    }, 300);
  };

  // Haptic feedback
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleNextWithHaptic = () => {
    triggerHaptic();
    handleNext();
  };

  const handlePrevWithHaptic = () => {
    triggerHaptic();
    handlePrev();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans flex flex-col overflow-hidden">

      {/* Logo Header - Minimal */}
      <header className="flex-shrink-0 py-6 flex justify-center items-center border-b border-gray-100">
        <h1 className="text-lg font-bold tracking-[0.35em] uppercase italic">
          MOKOBARA
        </h1>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 w-full flex flex-col overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Image Container - Responsive Height */}
        <div className={`flex-shrink-0 h-[400px] sm:h-[512px] relative bg-[#F9F9F9] overflow-hidden transition-opacity duration-300 ${
          isAnimating ? 'opacity-70' : 'opacity-100'
        }`}>
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-300 text-xs font-bold tracking-widest uppercase text-center">
                {currentProduct.name}<br />
                <span className="text-[10px] opacity-50">Image Preview</span>
              </div>
            </div>
          ) : (
            <>
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isAnimating ? 'scale-95' : 'scale-100'
                }`}
                loading="lazy"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
              />
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
            </>
          )}
        </div>

        {/* Bottom Info Card - Scrollable */}
        <div className={`flex-1 flex flex-col overflow-y-auto bg-[#FDFDFD] border-t border-gray-100 transition-all duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}>

          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 pt-3 flex-shrink-0">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  triggerHaptic();
                  setCurrentIndex(idx);
                  setImageError(false);
                  setImageLoading(true);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-[#1A1A1A] w-6'
                    : 'bg-gray-200 w-1.5'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>

          {/* Product Info - Scrollable */}
          <div className="px-5 py-3 space-y-2 overflow-y-auto">
            <h2 className="text-base font-light tracking-tight text-gray-800">
              {currentProduct.name}
            </h2>

            <p className="text-xs font-bold text-gray-900 italic leading-snug">
              "{currentProduct.tagline}"
            </p>

            <p className="text-xs text-gray-500 leading-relaxed">
              {currentProduct.utility}
            </p>
          </div>

          {/* Controls - Sticky at bottom */}
          <div className="px-5 pb-5 space-y-2 flex-shrink-0 bg-[#FDFDFD] border-t border-gray-50">
            <button
              className="w-full bg-[#1A1A1A] text-white py-3 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase active:scale-[0.97] transition-all touch-manipulation"
              onClick={handleNextWithHaptic}
            >
              Get Now
            </button>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevWithHaptic}
                className="flex-1 bg-white text-[#1A1A1A] border border-gray-200 py-3 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase active:bg-gray-50 active:scale-[0.97] transition-all touch-manipulation"
              >
                ← Back
              </button>
              <button
                onClick={handleNextWithHaptic}
                className="flex-1 bg-white text-[#1A1A1A] border border-gray-200 py-3 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase active:bg-gray-50 active:scale-[0.97] transition-all touch-manipulation"
              >
                Next →
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-400 tracking-wider">
              {currentIndex + 1} of {products.length} • Swipe to browse
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default MobileProductViewer;
