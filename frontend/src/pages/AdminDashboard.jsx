// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { 
  BarChart3, 
  Home, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Users,
  X,
  PlusCircle,
  Image as ImageIcon,
  CheckCircle2,
  Briefcase,
  Store,
  DollarSign,
  PieChart as PieChartIcon,
  Monitor,
  Eye,
  Tag,
  Gift,
  Clock,
  MapPin,
  Phone,
  Menu,
  ExternalLink,
  Globe
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = ({ onLogout, onViewSite }) => {
  const { user, refreshUser } = useAuth();
  const isTenant = user?.role === 'tenant';
  const tenantBrandId = user?.brandId;

  const [activeTab, setActiveTab] = useState(isTenant ? 'brands' : 'overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [offers, setOffers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const tenantBrand = brands.find(b => b._id === tenantBrandId);
  const brandName = isTenant ? (tenantBrand?.name || 'Merchant') : 'Super Admin';
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('property'); 
  const [editingItem, setEditingItem] = useState(null);
  
  // Form States
  const [propertyForm, setPropertyForm] = useState({ title: '', description: '', price: '', location: '', category: '', images: [''] });
  const [brandForm, setBrandForm] = useState({ 
    name: '', slug: '', logo: '', sidebarLogo: '', description: '', website: '', 
    contact: '', address: '', location: '', categoryId: '', subCategoryId: '', color: 'bg-white text-black border',
    timings: [{ day: 'Daily', time: '10:00 AM - 9:00 PM' }]
  });
  const [jobForm, setJobForm] = useState({ 
    title: '', brandName: '', type: 'Full Time', location: '', salary: '', 
    description: '', longDescription: '' 
  });
  const [offerForm, setOfferForm] = useState({
    title: '', brandName: '', discount: '', expiryDate: '', description: '', terms: '', image: ''
  });

  const COLORS = ['#15803d', '#28313d', '#3b82f6', '#f59e0b', '#ef4444'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propsRes, enqRes, catRes, brandRes, jobRes, appRes, offerRes] = await Promise.all([
          api.get('/properties'),
          api.get('/enquiries'),
          api.get('/categories'),
          api.get('/brands'),
          api.get('/jobs'),
          api.get('/applications'),
          api.get('/offers')
        ]);
        const bData = brandRes.data;
        const jData = jobRes.data;
        const oData = offerRes.data;
        const aData = appRes.data;

        if (isTenant) {
          setBrands(bData.filter(b => b._id === tenantBrandId));
          setJobs(jData.filter(j => j.brandId === tenantBrandId));
          setOffers(oData.filter(o => o.brandId === tenantBrandId));
          setApplications(aData.filter(a => a.job?.brandId === tenantBrandId));
        } else {
          setProperties(propsRes.data);
          setEnquiries(enqRes.data);
          setBrands(bData);
          setJobs(jData);
          setOffers(oData);
          setApplications(aData);
        }
        setCategories(catRes.data);
      } catch (err) {
        toast.error('Failed to sync management data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD Handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'property') {
      setPropertyForm(item ? { ...item, category: item.category?._id || item.category } : { title: '', description: '', price: '', location: '', category: '', images: [''] });
    } else if (type === 'brand') {
      setBrandForm(item ? { ...item } : brandForm);
    } else if (type === 'job') {
      setJobForm(item ? { ...item } : { ...jobForm, brandName: isTenant ? brands[0]?.name : '' });
    } else if (type === 'offer') {
      setOfferForm(item ? { ...item } : { ...offerForm, brandName: isTenant ? brands[0]?.name : '' });
    }
    setIsModalOpen(true);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Processing asset...');
    try {
      if (editingItem) {
        const res = await api.put(`/properties/${editingItem._id}`, propertyForm);
        setProperties(properties.map(p => p._id === editingItem._id ? res.data : p));
      } else {
        const res = await api.post('/properties', propertyForm);
        setProperties([res.data, ...properties]);
      }
      setIsModalOpen(false);
      toast.success('Portfolio updated', { id: loadingToast });
    } catch (err) {
      toast.error('Failed to save asset', { id: loadingToast });
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Updating tenant...');
    try {
      const res = await api.post('/brands', brandForm);
      setBrands([res.data, ...brands]);
      toast.success('Tenant data synced', { id: loadingToast });
      
      if (isTenant && !tenantBrandId) {
        await refreshUser();
      }
      
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Sync failed', { id: loadingToast });
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Listing opening...');
    try {
      const b = brands.find(brand => brand.name === jobForm.brandName);
      const res = await api.post('/jobs', { ...jobForm, brandId: b?._id, brandLogo: b?.logo });
      setJobs([res.data, ...jobs]);
      toast.success('Vacancy published', { id: loadingToast });
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to list job', { id: loadingToast });
    }
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Syncing offer...');
    try {
      const b = brands.find(brand => brand.name === offerForm.brandName);
      const res = await api.post('/offers', { ...offerForm, brandId: b?._id, brandLogo: b?.logo, image: offerForm.image || b?.logo });
      setOffers([res.data, ...offers]);
      toast.success('Offer live', { id: loadingToast });
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Sync failed', { id: loadingToast });
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Permanently remove this ${type}?`)) return;
    const loadingToast = toast.loading(`Deleting ${type}...`);
    try {
      await api.delete(`/${type}s/${id}`);
      if (type === 'property') setProperties(properties.filter(p => p._id !== id));
      if (type === 'brand') setBrands(brands.filter(b => b._id !== id));
      if (type === 'job') setJobs(jobs.filter(j => j._id !== id));
      if (type === 'offer') setOffers(offers.filter(o => o._id !== id));
      toast.success('Record deleted', { id: loadingToast });
    } catch (err) {
      toast.error('Deletion failed', { id: loadingToast });
    }
  };

  // Chart Data
  const revenueData = [
    { name: 'Jan', revenue: 42000 }, { name: 'Feb', revenue: 38000 }, { name: 'Mar', revenue: 52000 },
    { name: 'Apr', revenue: 48000 }, { name: 'May', revenue: 61000 }, { name: 'Jun', revenue: 58000 },
    { name: 'Jul', revenue: 75000 }
  ];

  const topBrands = [
    { name: 'Zudio', visits: 2450 }, { name: 'Starbucks', visits: 1250 },
    { name: 'McDonalds', visits: 1800 }, { name: 'Haldirams', visits: 842 },
    { name: 'Levis', visits: 720 }
  ].sort((a, b) => b.visits - a.visits);

  const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
      className="bg-white p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-brand-primary/20 transition-all">
      <div>
        <p className="text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">{value}</p>
      </div>
      <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${color} transition-transform group-hover:scale-110`}><Icon size={20} className="sm:w-6 sm:h-6" /></div>
    </motion.div>
  );

  const NavItem = ({ id, icon: Icon, label }) => (
    <button onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold ${activeTab === id ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      <Icon size={20} /><span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-brand-dark p-4 flex justify-between items-center sticky top-0 z-[60] shadow-md">
        <img src="https://hgeaton.com/images/logo_bl.png" alt="HG" className="h-8 brightness-0 invert" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white bg-white/10 rounded-xl">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-[55] h-screen w-80 bg-brand-dark flex flex-col pt-12 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="hidden lg:block px-10 mb-12">
          {isTenant && tenantBrand?.logo ? (
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-2xl p-2 flex items-center justify-center">
                 <img src={tenantBrand.logo} alt={brandName} className="max-w-full max-h-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-black tracking-tight text-sm uppercase">{brandName}</span>
                 <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest">Merchant Hub</span>
               </div>
            </div>
          ) : (
            <img src="https://hgeaton.com/images/logo_bl.png" alt="HG Admin" className="w-32 brightness-0 invert" />
          )}
        </div>
        
        <nav className="flex-grow px-6 space-y-1 overflow-y-auto custom-scrollbar pb-10">
          {!isTenant && (
            <>
              <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Core Management</p>
              <NavItem id="overview" icon={BarChart3} label="Dashboard" />
              <NavItem id="properties" icon={Home} label="Portfolio" />
              <NavItem id="enquiries" icon={MessageSquare} label="Enquiries" />
              <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4">Retail CRM</p>
            </>
          )}
          
          {isTenant && <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Outlet Management</p>}
          
          <NavItem id="brands" icon={Store} label={isTenant ? "My Outlet" : "Brands"} />
          <NavItem id="offers" icon={Tag} label="Offers" />
          <NavItem id="jobs" icon={Briefcase} label="Jobs" />
          <NavItem id="applications" icon={Users} label="Applicants" />

          {/* Quick Actions */}
          <div className="pt-8 px-6 space-y-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Links</p>
            <button 
              onClick={onViewSite}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-bold group"
            >
              <Globe size={20} className="group-hover:text-brand-primary" />
              <span>Visit Website</span>
              <ExternalLink size={14} className="ml-auto opacity-40" />
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold">
            <LogOut size={20} />Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-10 max-w-full overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 sm:mb-12 pt-4 lg:pt-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                {isTenant ? 'Merchant Portal' : 'Central Command'}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-400 font-bold text-xs capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {isTenant ? `Welcome, ${brandName}` : 'Portfolio Overview'}
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live CRM Connected</span>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /></div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 sm:space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                  <StatCard icon={DollarSign} label="Revenue" value="₹28.4L" color="bg-green-500/10 text-green-600" delay={0.1} />
                  <StatCard icon={Users} label="Daily Traffic" value="1.2M" color="bg-blue-500/10 text-blue-600" delay={0.2} />
                  <StatCard icon={Store} label="Tenants" value={brands.length} color="bg-amber-500/10 text-amber-600" delay={0.3} />
                  <StatCard icon={Tag} label="Live Offers" value={offers.length} color="bg-rose-500/10 text-rose-600" delay={0.4} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                  <div className="xl:col-span-2 bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-8 sm:mb-10">ROI Analytics</h3>
                    <div className="h-[250px] sm:h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#15803d" stopOpacity={0.1}/><stop offset="95%" stopColor="#15803d" stopOpacity={0}/></linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" aria-hidden="true" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 'bold'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 'bold'}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                          <Area type="monotone" dataKey="revenue" stroke="#15803d" strokeWidth={4} fill="url(#colorRev)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-8">Brand Loyalty</h3>
                    <div className="space-y-6 sm:space-y-8">
                      {topBrands.map((brand, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="text-gray-700">{brand.name}</span>
                            <span className="text-gray-400">{brand.visits}</span>
                          </div>
                          <div className="w-full h-2.5 sm:h-3 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(brand.visits / 2500) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                              className="h-full bg-brand-primary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Optimized Data Tables */}
            {(activeTab === 'brands' || activeTab === 'properties' || activeTab === 'jobs') && (
              <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className="bg-white rounded-[28px] sm:rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Active Records</h3>
                    <p className="text-gray-400 font-medium text-xs sm:text-sm">Real-time status of plaza entities</p>
                  </div>
                  <button onClick={() => openModal(activeTab.slice(0, -1))} 
                    className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg">
                    <Plus size={20}/> New Record
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr><th className="px-6 sm:px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Identification</th><th className="px-6 sm:px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Detail</th><th className="px-6 sm:px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Control</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {activeTab === 'brands' && brands.map(brand => (
                        <tr key={brand._id} className="group hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 sm:px-10 py-8 font-bold"><div className="flex items-center gap-4"><img src={brand.logo} className="w-12 h-12 rounded-xl object-contain border border-gray-100 p-2" /><span className="text-gray-900">{brand.name}</span></div></td>
                          <td className="px-6 sm:px-10 py-8 font-bold text-gray-500 text-sm">{brand.location || 'HUT.'}</td>
                          <td className="px-6 sm:px-10 py-8"><button onClick={() => handleDelete('brand', brand._id)} className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={20}/></button></td>
                        </tr>
                      ))}
                      {activeTab === 'properties' && properties.map(prop => (
                        <tr key={prop._id} className="group hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 sm:px-10 py-8 font-bold text-gray-900">{prop.title}</td>
                          <td className="px-6 sm:px-10 py-8 font-extrabold text-brand-dark">₹{prop.price?.toLocaleString('en-IN')}</td>
                          <td className="px-6 sm:px-10 py-8"><button onClick={() => handleDelete('property', prop._id)} className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={20}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Applications List */}
            {activeTab === 'applications' && (
              <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map(app => (
                  <div key={app._id} className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-gray-100 hover:shadow-xl transition-all">
                    <div className="flex justify-between mb-6">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary flex items-center justify-center rounded-2xl font-bold text-lg">{app.name[0]}</div>
                         <div><h4 className="font-extrabold text-[#28313d]">{app.name}</h4><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{app.job?.title || 'Unknown Role'}</p></div>
                       </div>
                       <div className="px-3 py-1 bg-green-50 text-[#0c9a50] text-[9px] font-bold rounded-lg h-fit uppercase tracking-widest">New Applicant</div>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-2xl text-gray-600 font-medium text-sm leading-relaxed mb-6 italic border-l-4 border-brand-primary">"{app.message}"</div>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                      <button className="flex-grow bg-brand-dark text-white py-3 rounded-xl font-bold text-xs hover:bg-black transition-all">RECRUIT</button>
                      <button className="px-4 py-3 border border-gray-200 text-gray-400 rounded-xl hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'offers' && (
              <motion.div key="offers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                 <div className="flex justify-between items-center bg-white p-6 sm:p-10 rounded-[32px] border border-gray-100 shadow-sm">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Promotional Campaigns</h3>
                      <p className="text-gray-400 font-medium text-xs sm:text-sm">Manage live discounts and seasonal deals</p>
                    </div>
                    <button onClick={() => openModal('offer')} 
                      className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg">
                      <Plus size={20}/> New Offer
                    </button>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 {offers.map(offer => (
                    <div key={offer._id} className="bg-white rounded-[28px] border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all">
                       <div className="h-40 bg-gray-50 relative overflow-hidden">
                          <img src={offer.image || offer.brandLogo} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 right-4 bg-rose-600 text-white px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-lg">{offer.discount}</div>
                       </div>
                       <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                             <img src={offer.brandLogo} className="w-8 h-8 rounded-lg shadow-sm bg-white p-1 border border-gray-100" />
                             <h4 className="font-extrabold text-gray-900 text-sm">{offer.brandName}</h4>
                          </div>
                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                             <span className="text-[10px] font-bold text-gray-400">EXP: {offer.expiryDate || 'N/A'}</span>
                             <button onClick={() => handleDelete('offer', offer._id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                          </div>
                       </div>
                    </div>
                 ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Shared Modal Overlay & Content (Unchanged functionality, updated Responsive UI) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white w-full max-w-xl rounded-[32px] sm:rounded-[40px] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-6 sm:p-10 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 capitalize">Entry Console</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-all"><X size={24} /></button>
              </div>
              <form onSubmit={modalType === 'property' ? handlePropertySubmit : modalType === 'brand' ? handleBrandSubmit : modalType === 'offer' ? handleOfferSubmit : handleJobSubmit} 
                className="p-6 sm:p-10 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
                {modalType === 'brand' && (
                  <>
                    <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Brand Name" value={brandForm.name} onChange={e => setBrandForm({...brandForm, name: e.target.value})} />
                    <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" placeholder="Location Code" value={brandForm.location} onChange={e => setBrandForm({...brandForm, location: e.target.value})} />
                    <textarea className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" placeholder="Brief Narrative" rows={3} value={brandForm.description} onChange={e => setBrandForm({...brandForm, description: e.target.value})} />
                  </>
                )}
                {modalType === 'job' && (
                  <>
                    <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Opportunity Title" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
                    {!isTenant ? (
                      <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" value={jobForm.brandName} onChange={e => setJobForm({...jobForm, brandName: e.target.value})}>
                        <option value="">Associated Tenant</option>
                        {brands.map(b => <option key={b._id} value={b.name}>{b.name}</option>)}
                      </select>
                    ) : (
                      <div className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm text-gray-500">
                        Managing for: <span className="text-brand-primary">{brands[0]?.name}</span>
                      </div>
                    )}
                  </>
                )}
                {modalType === 'offer' && (
                  <>
                    <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Offer Title (e.g. End of Season Sale)" value={offerForm.title} onChange={e => setOfferForm({...offerForm, title: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                      <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Discount (e.g. 50% OFF)" value={offerForm.discount} onChange={e => setOfferForm({...offerForm, discount: e.target.value})} />
                      <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Expiry Date" value={offerForm.expiryDate} onChange={e => setOfferForm({...offerForm, expiryDate: e.target.value})} />
                    </div>
                    <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Campaign Image URL" value={offerForm.image} onChange={e => setOfferForm({...offerForm, image: e.target.value})} />
                    {!isTenant ? (
                      <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" value={offerForm.brandName} onChange={e => setOfferForm({...offerForm, brandName: e.target.value})}>
                        <option value="">Associated Tenant</option>
                        {brands.map(b => <option key={b._id} value={b.name}>{b.name}</option>)}
                      </select>
                    ) : (
                      <div className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm text-gray-500">
                        Managing for: <span className="text-brand-primary">{brands[0]?.name}</span>
                      </div>
                    )}
                  </>
                )}
                <button type="submit" className="w-full bg-brand-dark text-white py-4 sm:py-5 rounded-2xl shadow-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">Authorize Record Entry</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
