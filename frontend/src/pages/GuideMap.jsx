import React, { useState, useMemo } from 'react';
import { brands } from '../data/brands';
import mapAsset from '../assets/mall_map.png';

// Custom Icons
const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const CompassIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
);

const CubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
);

const LocationIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
);

const ShareIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="7.51" y2="11.49"/></svg>
);

const GuideMap = () => {
  const [originTerm, setOriginTerm] = useState('');
  const [destinationTerm, setDestinationTerm] = useState('');
  const [activeInput, setActiveInput] = useState('destination'); // 'origin' or 'destination'
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [is3d, setIs3d] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Handlers
  const handle3dToggle = () => setIs3d(!is3d);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleLocation = () => {
      setIsLocating(true);
      
      if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser");
          setIsLocating(false);
          return;
      }

      navigator.geolocation.getCurrentPosition(
          (position) => {
              // In a real app, we'd reverse geocode or show coords. 
              // For this architectural map, we'll confirm the lock-on.
              setOriginTerm('My Current Location (Locked)');
              setIsLocating(false);
          },
          (error) => {
              console.error("Location error:", error);
              alert("Location access denied or unavailable. Please enable location services.");
              setIsLocating(false);
          }
      );
  };
  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
  };

  const filteredBrands = useMemo(() => {
    const term = activeInput === 'origin' ? originTerm : destinationTerm;
    if (term === 'My Current Location') return brands;
    return brands.filter(b => b.name.toLowerCase().includes(term.toLowerCase()));
  }, [originTerm, destinationTerm, activeInput]);

  // Simulated coordinate mapping for the markers
  const markers = useMemo(() => {
    return brands.slice(0, 15).map((brand, index) => {
      // Create a deterministic but spread out layout of markers over the map
      const angles = [0, 45, 90, 135, 180, 225, 270, 315];
      const radius = index < 8 ? 25 : 40;
      const angle = angles[index % 8] * (Math.PI / 180);
      return {
        id: brand.id,
        name: brand.name,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.8,
      };
    });
  }, []);

  const handleBrandClick = (brand) => {
    if (activeInput === 'origin') {
        setOriginTerm(brand.name);
    } else {
        setDestinationTerm(brand.name);
        setSelectedBrand(brand);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f9fa] font-sans">
      {/* Sidebar */}
      <div className="w-[320px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col shadow-xl z-20">
        <div className="p-6 space-y-6">
          <div className="space-y-3 relative">
            {/* Origin Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <div className="w-2 h-2 rounded-full border-2 border-blue-500" />
              </div>
              <input 
                type="text" 
                placeholder="Starting Point"
                value={originTerm}
                onFocus={() => setActiveInput('origin')}
                onChange={(e) => setOriginTerm(e.target.value)}
                className={`w-full bg-gray-50 border rounded-lg py-2.5 pl-10 pr-4 outline-none transition-all text-sm font-medium ${activeInput === 'origin' ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-100'}`}
              />
            </div>

            {/* Connecting Line simulation */}
            <div className="absolute left-[17px] top-[38px] bottom-[38px] w-0.5 bg-gray-200 border-l border-dashed z-0" />

            {/* Destination Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LocationIcon size={14} className="text-[#e4405f]" />
              </div>
              <input 
                type="text" 
                placeholder="Destination"
                value={destinationTerm}
                onFocus={() => setActiveInput('destination')}
                onChange={(e) => setDestinationTerm(e.target.value)}
                className={`w-full bg-gray-50 border rounded-lg py-2.5 pl-10 pr-4 outline-none transition-all text-sm font-medium ${activeInput === 'destination' ? 'border-[#e4405f] ring-2 ring-red-50' : 'border-gray-100'}`}
              />
            </div>
          </div>

          <button 
            onClick={handleLocation}
            className="group flex items-center space-x-3 text-[#28313d] font-bold text-[11px] tracking-widest hover:text-blue-600 transition-colors uppercase w-full bg-gray-50 p-3 rounded-lg border border-gray-100"
          >
            <LocationIcon size={16} className={`text-blue-500 ${isLocating ? 'animate-ping' : ''}`} />
            <span>Use My Location</span>
          </button>

          <div className="space-y-4 pt-2">
            <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest px-1">Points of Interest</h3>
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <p className="text-xs font-bold text-blue-800 leading-relaxed uppercase tracking-tight">HG Eaton Plaza, NH 7, Handiaya, Punjab 148107, India</p>
            </div>
          </div>
        </div>

        {/* Brand List */}
        <div className="flex-grow overflow-y-auto px-2 space-y-1 pb-10 custom-scrollbar">
          {filteredBrands.map((brand) => (
            <button 
              key={brand.id}
              onClick={() => handleBrandClick(brand)}
              className={`w-full text-left px-4 py-3.5 rounded-lg transition-all flex items-center justify-between border-b border-gray-50/50 ${
                selectedBrand?.id === brand.id 
                  ? 'bg-blue-600 text-white shadow-lg translate-x-1' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide truncate max-w-[200px]">
                {brand.id.replace(/-/g, ' ' )}
              </span>
              <span className={`text-[10px] uppercase font-extrabold ${selectedBrand?.id === brand.id ? 'text-blue-200' : 'text-gray-400'}`}>
                {brand.location}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Viewport */}
      <div className="flex-grow relative overflow-hidden bg-[#e9ecef]">
        {/* The Map itself */}
        <div className="absolute inset-0 flex items-center justify-center p-20 select-none transition-all duration-700 ease-in-out"
             style={{ 
                 perspective: is3d ? '1200px' : 'none',
                 transform: `rotateZ(${rotation}deg)`
             }}>
          <div className="relative max-w-full max-h-full transition-all duration-700 ease-in-out"
               style={{ 
                   transform: is3d ? 'rotateX(55deg) translateZ(0)' : 'none',
                   transformStyle: 'preserve-3d'
               }}>
            <img 
              src={mapAsset} 
              alt="Mall Map" 
              className={`max-w-full max-h-full object-contain transition-all duration-700 ${is3d ? 'drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] scale-110' : 'drop-shadow-2xl'}`}
            />
            
            {/* Interactive Markers Layer */}
            <div className="absolute inset-0">
               {markers.map((marker) => (
                 <div 
                   key={marker.id}
                   onClick={() => handleBrandClick(marker)}
                   style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                   className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10`}
                 >
                   <div className={`relative flex items-center justify-center`}>
                      <div className={`w-3 h-3 rounded-full shadow-lg border-2 border-white transition-all duration-300 ${
                        selectedBrand?.id === marker.id ? 'bg-blue-600 scale-150' : 'bg-[#e4405f] hover:scale-125'
                      }`} />
                      {selectedBrand?.id === marker.id && (
                        <div className="absolute -inset-2 bg-blue-600/30 rounded-full animate-ping" />
                      )}
                      
                      {/* Name Label */}
                      <div className={`absolute bottom-full mb-3 px-3 py-1.5 bg-[#28313d] text-white text-[10px] font-bold rounded shadow-xl whitespace-nowrap uppercase tracking-widest transition-all ${
                        selectedBrand?.id === marker.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0'
                      }`}>
                        {marker.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-[#28313d]" />
                      </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex flex-col space-y-3 z-30">
          <button 
            onClick={handle3dToggle}
            className={`p-3 rounded-full shadow-lg transition-all active:scale-95 group border ${is3d ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}
          >
            <span className={`text-xs font-extrabold block ${is3d ? 'text-white' : 'group-hover:text-blue-600'}`}>3D</span>
          </button>
          
          <button 
            onClick={handleRotate}
            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gray-50 text-gray-700 active:scale-95 border border-gray-100"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <CompassIcon size={20} />
          </button>
          
          <button 
            onClick={handleLocation}
            className={`p-3 rounded-full shadow-lg transition-all active:scale-95 border ${isLocating ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-100 text-gray-400'}`}
          >
            <LocationIcon size={20} className={isLocating ? 'animate-pulse' : ''} />
          </button>
          
          <button 
            onClick={handleShare}
            className={`p-3 rounded-full shadow-lg transition-all active:scale-95 border ${shareSuccess ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}
          >
            {shareSuccess ? (
                <div className="text-[10px] font-bold">COPIED</div>
            ) : (
                <ShareIcon size={20} />
            )}
          </button>
        </div>

        {/* Bottom Logo Overlay */}
        <div className="absolute bottom-6 left-6 z-30 opacity-50 select-none">
          <img 
            src="https://hgeaton.com/images/logo_bl.png" 
            alt="Logo" 
            className="w-24 grayscale brightness-0 h-auto"
          />
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default GuideMap;
