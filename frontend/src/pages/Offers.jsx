import React, { useState, useMemo } from 'react';
import BrandSidebar from '../components/layout/brands/BrandSidebar';
import BrandFilterBar from '../components/layout/brands/BrandFilterBar';
import OfferCard from '../components/layout/brands/OfferCard';
import { offers } from '../data/offers';

const Offers = ({ onBrandClick }) => {
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
  const filteredOffers = useMemo(() => {
    let result = offers.filter(offer => {
      // Keyword filter
      const matchesKeyword = offer.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                            offer.offerTitle.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                            (offer.description && offer.description.toLowerCase().includes(filters.keyword.toLowerCase()));
      
      // Outlet filter
      const matchesOutlet = offer.location?.toLowerCase().includes(filters.outletName.toLowerCase()) ||
                           offer.name.toLowerCase().includes(filters.outletName.toLowerCase());

      // Category filter
      const matchesCat = filters.selectedCats.length === 0 || filters.selectedCats.includes(offer.catId);
      const matchesSubCat = filters.selectedSubCats.length === 0 || filters.selectedSubCats.includes(offer.subCatId);

      // Featured filter
      const matchesFeatured = !featuredOnly || offer.views > 1000;

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
  }, [filters, sortBy, featuredOnly]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100 mb-8 py-10">
        <div className="container mx-auto px-4">
          <div className="text-left animate-in slide-in-from-left duration-700 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
              <span className="text-[#EE171F]">Grab the Best Offers, Deals & Discounts</span> <br />
              <span className="text-[#28313d]">on every brand outlet at</span> <span className="text-[#0c9a50]">HG Eaton Plaza</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium">Flash sales, seasonal clearance, and exclusive member-only deals</p>
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
              resultCount={filteredOffers.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              featuredOnly={featuredOnly}
              onFeaturedToggle={setFeaturedOnly}
            />

            {/* Results Grid */}
            {filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredOffers.map(offer => (
                  <OfferCard 
                    key={offer.id} 
                    offer={offer} 
                    onClick={() => onBrandClick?.({ id: offer.brandId })} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium text-lg">No offers found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setFilters({ keyword: '', outletName: '', selectedCats: [], selectedSubCats: [] });
                    setFeaturedOnly(false);
                  }}
                  className="mt-4 text-[#EE171F] font-bold hover:underline"
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

export default Offers;
