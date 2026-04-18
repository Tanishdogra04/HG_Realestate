import React, { useState } from 'react';
import { categories } from '../../../data/categories';

const ChevronDown = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

const Search = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const BrandSidebar = ({ 
  filters, 
  onFilterChange, 
  onCategoryToggle, 
  onSubCategoryToggle 
}) => {
  const [expandedCats, setExpandedCats] = useState([1, 2, 3, 4]); // Default expanded

  const toggleExpand = (catId) => {
    setExpandedCats(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  return (
    <aside className="w-full space-y-6">
      {/* Search Groups */}
      <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 italic font-medium text-gray-700">Filters</div>
        <div className="p-4 space-y-6">
          {/* Keyword Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Keyword</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Brand.."
                className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-[#0c9a50]"
                value={filters.keyword}
                onChange={(e) => onFilterChange('keyword', e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Outlet Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Outlet</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Outlet Name.."
                className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-[#0c9a50]"
                value={filters.outletName}
                onChange={(e) => onFilterChange('outletName', e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</label>
            <div className="space-y-1 mt-2">
              {categories.map(cat => (
                <div key={cat.id} className="border-b border-gray-50 last:border-0 pb-1">
                  <div className="flex items-center justify-between py-2">
                    <label className="flex items-center space-x-3 cursor-pointer group flex-grow">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-[#0c9a50] focus:ring-[#0c9a50]" 
                        checked={filters.selectedCats.includes(cat.id)}
                        onChange={() => onCategoryToggle(cat.id)}
                      />
                      <span className={`text-sm font-bold ${filters.selectedCats.includes(cat.id) ? 'text-[#0c9a50]' : 'text-gray-700'} group-hover:text-[#0c9a50] transition-colors`}>
                        {cat.name}
                      </span>
                    </label>
                    {cat.subcategories && (
                      <button 
                        onClick={() => toggleExpand(cat.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${expandedCats.includes(cat.id) ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {cat.subcategories && expandedCats.includes(cat.id) && (
                    <div className="pl-8 pb-3 space-y-2 animate-in slide-in-from-top-1 duration-200">
                      {cat.subcategories.map(sub => (
                        <label key={sub.id} className="flex items-center space-x-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-3.5 h-3.5 rounded text-[#0c9a50] focus:ring-[#0c9a50]" 
                            checked={filters.selectedSubCats.includes(sub.id)}
                            onChange={() => onSubCategoryToggle(sub.id)}
                          />
                          <span className={`text-[13px] ${filters.selectedSubCats.includes(sub.id) ? 'text-[#0c9a50]' : 'text-gray-600'} group-hover:text-[#0c9a50] transition-colors`}>
                            {sub.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BrandSidebar;
