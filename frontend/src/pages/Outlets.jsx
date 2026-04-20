import React, { useState, useMemo, useEffect } from 'react';
import BrandSidebar from '../components/layout/brands/BrandSidebar';
import BrandFilterBar from '../components/layout/brands/BrandFilterBar';
import BrandDirectoryCard from '../components/layout/brands/BrandDirectoryCard';
import api from '../utils/api';
// import { brands } from '../data/brands';
// import { extraBrands } from '../data/extraBrands';

const Outlets = ({ onBrandClick }) => {
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get('/brands');
        setAllBrands(res.data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Filter & Sort State
  const [filters, setFilters] = useState({
    keyword: '',
    outletName: '',
    selectedCats: [],
    selectedSubCats: [],
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCategoryToggle = (catId) => {
    setFilters(prev => ({
      ...prev,
      selectedCats: prev.selectedCats.includes(catId)
        ? prev.selectedCats.filter(id => id !== catId)
        : [...prev.selectedCats, catId]
    }));
  };

  const handleSubCategoryToggle = (subId) => {
    setFilters(prev => ({
      ...prev,
      selectedSubCats: prev.selectedSubCats.includes(subId)
        ? prev.selectedSubCats.filter(id => id !== subId)
        : [...prev.selectedSubCats, subId]
    }));
  };

  // Filtering Logic
  const filteredBrands = useMemo(() => {
    let result = allBrands.filter(brand => {
      // Keyword filter
      const matchesKeyword = brand.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                            (brand.description && brand.description.toLowerCase().includes(filters.keyword.toLowerCase()));
      
      // Outlet filter
      const matchesOutlet = brand.location?.toLowerCase().includes(filters.outletName.toLowerCase()) ||
                           brand.name.toLowerCase().includes(filters.outletName.toLowerCase());

      // Category filter
      const matchesCat = filters.selectedCats.length === 0 || filters.selectedCats.includes(brand.categoryId);
      const matchesSubCat = filters.selectedSubCats.length === 0 || filters.selectedSubCats.includes(brand.subCategoryId);

      // Featured filter (e.g., views > 1000)
      const matchesFeatured = !featuredOnly || brand.views > 1000;

      return matchesKeyword && matchesOutlet && matchesCat && matchesSubCat && matchesFeatured;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'az') return a.name.localeCompare(b.name);
      if (sortBy === 'za') return b.name.localeCompare(a.name);
      if (sortBy === 'popularity') return b.views - a.views;
      return 0;
    });

    return result;
  }, [allBrands, filters, sortBy, featuredOnly]);

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
            <p className="text-xl text-gray-500 font-medium">Explore premium outlets and exclusive deals at HG Eaton Plaza</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - 3 Columns */}
          <div className="lg:w-1/4">
            <BrandSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onCategoryToggle={handleCategoryToggle}
              onSubCategoryToggle={handleSubCategoryToggle}
            />
          </div>

          {/* Main Content - 9 Columns */}
          <div className="lg:w-3/4 space-y-6">
            {/* Filter Bar */}
            <BrandFilterBar 
              resultCount={filteredBrands.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              featuredOnly={featuredOnly}
              onFeaturedToggle={setFeaturedOnly}
            />

            {/* Results Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[#0c9a50]/20 border-t-[#0c9a50] rounded-full animate-spin" />
              </div>
            ) : filteredBrands.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredBrands.map(brand => (
                  <BrandDirectoryCard 
                    key={brand._id || brand.id} 
                    brand={brand} 
                    onClick={onBrandClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium text-lg">No outlets found matching your filters.</p>
                <button 
                  onClick={() => {
                    setFilters({ keyword: '', outletName: '', selectedCats: [], selectedSubCats: [] });
                    setFeaturedOnly(false);
                  }}
                  className="mt-4 text-[#0c9a50] font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlets;
