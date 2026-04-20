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
    className={filled ? "text-[#EE171F]" : "text-gray-400"}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const OfferCard = ({ offer, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Promo Image */}
      <div 
        className="relative h-[160px] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => onClick(offer)}
      >
        <img 
          src={offer.image} 
          alt={offer.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-[#EE171F] text-white text-[11px] font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider">
           ACTIVE OFFER
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 pt-1 relative flex-grow border-t border-gray-50">
        {/* Brand Avatar Overlay */}
        <div 
          className="absolute -top-7 right-4 w-14 h-14 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden cursor-pointer"
          onClick={() => onClick(offer)}
        >
          <img 
            src={offer.brandLogo || offer.logo} 
            alt={offer.brandName} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Offer Info */}
        <div className="mt-3 space-y-2">
          <h3 
            className="text-gray-400 font-bold text-[11px] uppercase tracking-widest hover:text-[#0c9a50] cursor-pointer"
            onClick={() => onClick(offer)}
          >
            {offer.brandName}
          </h3>
          <div 
            className="text-[#28313d] font-extrabold text-lg leading-tight group-hover:text-[#EE171F] transition-colors cursor-pointer"
            onClick={() => onClick(offer)}
          >
            {offer.title}
          </div>
          <p className="text-gray-500 text-[13px] line-clamp-1 italic">
            {offer.description}
          </p>
        </div>
      </div>

      {/* Footer Utilities */}
      <div className="px-4 py-3 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center space-x-5">
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
                  src={`https://quickchart.io/qr?text=https://hgeaton.com/offer/${offer.id}&choe=UTF-8&chs=200x200`}
                  alt="QR Code"
                  className="w-full h-auto"
                />
                <p className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-tighter">Scan for digital coupon</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="transition-transform active:scale-125"
          >
            <Heart size={18} filled={isFavorite} />
          </button>
        </div>

        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           {offer.location}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
