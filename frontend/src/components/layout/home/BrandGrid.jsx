import React from 'react';
import { brands } from '../../../data/brands';

const BrandCard = ({ brand, onClick }) => (
  <div 
    onClick={() => onClick && onClick(brand)}
    className="flex flex-col border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow bg-white cursor-pointer group"
  >
    <div className={`h-32 flex items-center justify-center p-0 overflow-hidden ${brand.color}`}>
      {brand.image ? (
        <img 
          src={brand.image} 
          alt={brand.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <span className="text-xl font-bold text-center leading-tight p-4">{brand.name}</span>
      )}
    </div>
    <div className="bg-gray-50 py-2 border-t border-gray-100">
      <p className="text-[10px] font-bold text-center tracking-wider text-gray-600">{brand.name}</p>
    </div>
  </div>
);

const BrandGrid = (props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {brands.map((brand) => (
        <BrandCard 
          key={brand.id} 
          brand={brand} 
          onClick={props.onBrandClick}
        />
      ))}
    </div>
  );
};

export default BrandGrid;
