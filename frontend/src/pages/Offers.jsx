import React, { useState, useMemo, useEffect } from 'react';
import BrandSidebar from '../components/layout/brands/BrandSidebar';
import BrandFilterBar from '../components/layout/brands/BrandFilterBar';
import OfferCard from '../components/layout/brands/OfferCard';
import api from '../utils/api';
// import { offers } from '../data/offers';

const Offers = ({ onBrandClick }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/offers');
        setOffers(res.data);
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);
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
      const matchesKeyword = (offer.brandName?.toLowerCase().includes(filters.keyword.toLowerCase()) || false) ||
                            (offer.title?.toLowerCase().includes(filters.keyword.toLowerCase()) || false) ||
                            (offer.description?.toLowerCase().includes(filters.keyword.toLowerCase()) || false);
      
      // Outlet filter
      const matchesOutlet = (offer.location?.toLowerCase().includes(filters.outletName.toLowerCase()) || false) ||
                           (offer.brandName?.toLowerCase().includes(filters.outletName.toLowerCase()) || false);

      // Category filter
      const matchesCat = filters.selectedCats.length === 0 || filters.selectedCats.includes(offer.categoryId);
      const matchesSubCat = filters.selectedSubCats.length === 0 || filters.selectedSubCats.includes(offer.subCategoryId);

      // Featured filter
      const matchesFeatured = !featuredOnly || offer.views > 1000;

      return matchesKeyword && matchesOutlet && matchesCat && matchesSubCat && matchesFeatured;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'az') return (a.brandName || '').localeCompare(b.brandName || '');
      if (sortBy === 'za') return (b.brandName || '').localeCompare(a.brandName || '');
      if (sortBy === 'popularity') return (b.views || 0) - (a.views || 0);
      return 0;
    });

    return result;
  }, [offers, filters, sortBy, featuredOnly]);

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
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[#EE171F]/20 border-t-[#EE171F] rounded-full animate-spin" />
              </div>
            ) : filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredOffers.map(offer => (
                  <OfferCard 
                    key={offer._id || offer.id} 
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
