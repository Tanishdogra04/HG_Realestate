import React, { useState, useMemo, useEffect } from 'react';
import BrandSidebar from '../components/layout/brands/BrandSidebar';
import JobCard from '../components/layout/brands/JobCard';
import ApplyModal from '../components/layout/brands/ApplyModal';
import api from '../utils/api';
// import { jobs } from '../data/jobs';

const Jobs = () => {
  // Filter & Sort State
  const [filters, setFilters] = useState({
    keyword: '',
    outletName: '',
    selectedCats: [],
    selectedSubCats: [],
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    job: null,
    mode: 'apply'
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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

  const openApplyModal = (job) => {
    setModalConfig({ isOpen: true, job, mode: 'apply' });
  };

  const openDetailsModal = (job) => {
    setModalConfig({ isOpen: true, job, mode: 'details' });
  };

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Keyword filter
      const matchesKeyword = (job.title?.toLowerCase().includes(filters.keyword.toLowerCase()) || false) ||
                            (job.brandName?.toLowerCase().includes(filters.keyword.toLowerCase()) || false) ||
                            (job.description?.toLowerCase().includes(filters.keyword.toLowerCase()) || false);
      
      // Outlet filter
      const matchesOutlet = job.brandName.toLowerCase().includes(filters.outletName.toLowerCase());

      // Category filter
      const matchesCat = filters.selectedCats.length === 0 || filters.selectedCats.includes(job.categoryId);
      const matchesSubCat = filters.selectedSubCats.length === 0 || filters.selectedSubCats.includes(job.subCategoryId);

      return matchesKeyword && matchesOutlet && matchesCat && matchesSubCat;
    });
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100 mb-8 py-16">
        <div className="container mx-auto px-4">
          <div className="text-left animate-in slide-in-from-left duration-700 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#28313d] mb-4 tracking-tight leading-tight">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
              Discover exciting career opportunities with leading brands at HG Eaton Plaza.
            </p>
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
            {/* Results Info */}
            <div className="flex items-center justify-between px-2">
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                Showing <span className="text-[#0c9a50] font-bold text-lg">{filteredJobs.length}</span> positions available
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[#0c9a50]/20 border-t-[#0c9a50] rounded-full animate-spin" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job._id || job.id} 
                    job={job} 
                    onApply={openApplyModal}
                    onViewDetails={openDetailsModal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium text-lg">No career opportunities found matching your filters.</p>
                <button 
                  onClick={() => setFilters({ keyword: '', outletName: '', selectedCats: [], selectedSubCats: [] })}
                  className="mt-4 text-[#0c9a50] font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shared Applicaton/Details Modal */}
      <ApplyModal 
        isOpen={modalConfig.isOpen}
        job={modalConfig.job}
        mode={modalConfig.mode}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
};

export default Jobs;
