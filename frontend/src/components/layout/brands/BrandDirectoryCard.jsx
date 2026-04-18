import React, { useState } from 'react';

const QR = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3"/><path d="M7 12h3"/></svg>
);

const Heart = ({ size = 20, filled = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={filled ? "text-red-500" : "text-gray-400"}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const MessageCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

const BrandDirectoryCard = ({ brand, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Banner Image */}
      <div 
        className="relative h-[150px] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => onClick(brand)}
      >
        <img 
          src={brand.image} 
          alt={brand.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Featured Badge Placeholder if needed */}
        {brand.views > 2000 && (
           <div className="absolute top-3 left-3 bg-[#0c9a50] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-widest">
             Top Viewed
           </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 pt-1 relative flex-grow border-t border-gray-50">
        {/* Avatar Overlay */}
        <div 
          className="absolute -top-6 right-4 w-12 h-12 rounded-full border-4 border-white bg-white shadow-md overflow-hidden cursor-pointer"
          onClick={() => onClick(brand)}
        >
          <img 
            src={brand.sidebarLogo} 
            alt={brand.name} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Brand Info */}
        <div className="mt-2 space-y-1">
          <h3 
            className="text-[#0c9a50] font-bold text-sm md:text-base hover:underline cursor-pointer tracking-tight"
            onClick={() => onClick(brand)}
          >
            {brand.name}
          </h3>
          <p className="text-gray-600 text-[13px] font-medium">
            {brand.location || "HG Eaton Plaza"}
          </p>
        </div>
      </div>

      {/* Footer Utilities */}
      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center space-x-4">
          {/* QR Utility */}
          <div className="relative">
            <button 
              onMouseEnter={() => setShowQR(true)}
              onMouseLeave={() => setShowQR(false)}
              className="text-gray-400 hover:text-[#0c9a50] transition-colors"
            >
              <QR size={18} />
            </button>
            
            {showQR && (
              <div className="absolute bottom-full mb-2 left-0 z-50 bg-white p-3 rounded-lg shadow-2xl border border-gray-100 w-48 animate-in fade-in slide-in-from-bottom-2">
                <img 
                  src={`https://quickchart.io/qr?text=https://hgeaton.com/brand/${brand.id}&choe=UTF-8&chs=200x200`}
                  alt="QR Code"
                  className="w-full h-auto"
                />
                <p className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-tighter">Scan to view on mobile</p>
              </div>
            )}
          </div>

          <button className="text-gray-400 hover:text-[#0c9a50] transition-colors">
            <MessageCircle size={18} />
          </button>
          
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="transition-transform active:scale-125"
          >
            <Heart size={18} filled={isFavorite} />
          </button>
        </div>

        {/* Price/Misc placeholder if needed */}
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           {brand.views} Views
        </div>
      </div>
    </div>
  );
};

export default BrandDirectoryCard;
