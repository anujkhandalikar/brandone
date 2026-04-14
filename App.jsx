import React, { useState } from 'react';
import MobileProductViewer from './products-mobile';

// Mokobara Logo Component
const MokobaraLogo = () => (
  <img
    src="https://mokobara.com/cdn/shop/files/Mokobara-logo-R.png?v=1693389220&width=1920"
    alt="Mokobara"
    className="h-12 w-auto"
  />
);

const DesktopProductViewer = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageError(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAnimating(false);
    }, 400);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans flex flex-col items-center px-8 overflow-hidden">

      {/* Logo Header */}
      <header className="w-full py-4 flex justify-center items-center">
        <MokobaraLogo />
      </header>

      {/* Product Display */}
      <main className="flex-1 w-full max-w-sm flex flex-col items-center justify-center space-y-6 pb-8 px-6 overflow-y-auto">

        {/* Image Container */}
        <div
          className="relative w-full h-[512px] bg-[#F9F9F9] rounded-3xl overflow-hidden shadow-sm flex items-center justify-center flex-shrink-0">
          {imageError ? (
            <div className="text-gray-300 text-xs font-bold tracking-widest uppercase text-center p-8">
              {currentProduct.name}<br />
              <span className="text-[10px] opacity-50">Image Preview</span>
            </div>
          ) : (
            <div className={`w-full h-full transition-all duration-500 ease-in-out transform ${isAnimating
              ? 'opacity-0 scale-95' : 'opacity-100 scale-100' }`}>
              <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover"
                loading="eager" onError={() => setImageError(true)}
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className={`text-center space-y-2 transition-all duration-500 flex-shrink-0 ${isAnimating ? 'opacity-0 translate-y-2'
          : 'opacity-100 translate-y-0' }`}>
          <h2 className="text-lg font-light tracking-tight text-gray-800">
            {currentProduct.name}
          </h2>

          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-900 italic leading-snug">
              "{currentProduct.tagline}"
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {currentProduct.utility}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full space-y-3 flex-shrink-0">
          <button
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase active:scale-[0.97] transition-all">
            Get Now
          </button>

          <button onClick={handleNext}
            className="w-full bg-white text-[#1A1A1A] border border-gray-200 py-3 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase active:bg-gray-50 active:scale-[0.97] transition-all">
            Another
          </button>
        </div>

      </main>

      {/* Footer Buffer */}
      <div className="h-8" />
    </div>
  );
};

// Use mobile on small screens, desktop on larger
const App = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileProductViewer /> : <DesktopProductViewer />;
};

export default App;
