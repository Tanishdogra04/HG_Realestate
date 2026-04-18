import React from 'react';

const BrandFilterBar = ({ 
  resultCount, 
  sortBy, 
  onSortChange, 
  featuredOnly, 
  onFeaturedToggle 
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center space-x-6">
        {/* Result Count */}
        <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
          <span className="text-[#0c9a50] font-bold text-lg mr-1">{resultCount}</span> results found
        </div>

        {/* Featured Toggle */}
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={featuredOnly}
              onChange={(e) => onFeaturedToggle(e.target.checked)}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${featuredOnly ? 'bg-[#0c9a50]' : 'bg-gray-200'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${featuredOnly ? 'translate-x-4 shadow-[0_0_8px_rgba(12,154,80,0.4)]' : ''}`}></div>
          </div>
          <span className={`ml-3 text-sm font-bold tracking-tight transition-colors ${featuredOnly ? 'text-[#0c9a50]' : 'text-gray-600'}`}>
            Featured Only
          </span>
        </label>
      </div>

      {/* Sort selection */}
      <div className="flex items-center space-x-3">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sort By</label>
        <select 
          className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm font-bold text-gray-700 outline-none focus:ring-1 focus:ring-[#0c9a50] cursor-pointer"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popularity">Most Popular</option>
          <option value="az">Title: (A-Z)</option>
          <option value="za">Title: (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default BrandFilterBar;
