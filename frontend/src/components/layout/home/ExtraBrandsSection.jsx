import React from 'react';
import { extraBrands } from '../../../data/extraBrands';

const ExtraBrandCard = ({ brand, onClick }) => (
  <div 
    onClick={() => onClick(brand)}
    className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:shadow-md transition-all bg-white cursor-pointer group relative min-h-[55px] h-[55px]"
  >
    <div className="flex-grow pr-10">
      <p className="text-[11px] md:text-[12px] font-bold text-gray-800 tracking-tight uppercase leading-tight">
        {brand.name}
      </p>
    </div>
    <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 z-10 transition-transform group-hover:scale-110">
       <div className="w-11 h-11 rounded-full border border-gray-100 bg-white flex items-center justify-center overflow-hidden shadow-sm">
         {(brand.image && !brand.image.includes('nophoto.png')) ? (
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-full h-full object-contain p-1.5" 
            />
         ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-400">LOGO</span>
            </div>
         )}
       </div>
    </div>
  </div>
);

const ExtraBrandsSection = ({ onBrandClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-5 px-4 py-4">
      {extraBrands.map((brand, index) => (
        <div key={index} className="block transition-transform hover:scale-[1.02]">
          <ExtraBrandCard brand={brand} onClick={onBrandClick} />
        </div>
      ))}
    </div>
  );
};

export default ExtraBrandsSection;
