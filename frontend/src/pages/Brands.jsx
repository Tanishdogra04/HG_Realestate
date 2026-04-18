import React from 'react';
import BrandGrid from '../components/layout/home/BrandGrid';
import ExtraBrandsSection from '../components/layout/home/ExtraBrandsSection';

const Brands = ({ onBrandClick }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100 mb-8 py-10">
        <div className="container mx-auto px-4">
          <div className="text-left animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0c9a50] mb-3 tracking-tight uppercase leading-tight">
              LOOK FOR OFFERS & <br className="hidden md:block" />
              <span className="text-[#28313d]">Get The Best Discounts</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium tracking-tight">Explore the finest brands and exclusive outlets at HG Eaton Plaza</p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="container mx-auto px-4 pb-12">
        <BrandGrid onBrandClick={onBrandClick} />
      </div>

      {/* Extended Brands Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <ExtraBrandsSection onBrandClick={onBrandClick} />
        </div>
      </div>
    </div>
  );
};

export default Brands;
