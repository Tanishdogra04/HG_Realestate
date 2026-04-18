import React, { useState } from 'react';

// Custom Icons to avoid lucide-react dependency issues
const ChevronRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const Check = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);
const Phone = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MapPin = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const Clock = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const Share2 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="7.51" y2="11.49"/></svg>
);
const Copy = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const MessageCircle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);
const Mail = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const User = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Hash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
);

const OutletDetail = ({ brand, onBack }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!brand) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-8 uppercase tracking-widest">
          <button onClick={onBack} className="hover:text-brand-primary">Home</button>
          <ChevronRight size={12} />
          <span className="hover:text-brand-primary cursor-pointer">Outlets</span>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold">{brand.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl font-serif text-gray-900 mb-6">Views : {brand.views || '564'}</h1>
            
            <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">Description</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Brand Outlet Category</h3>
                    <div className="flex flex-wrap gap-4">
                      {brand.categories?.map((cat) => (
                        <div key={cat} className="flex items-center text-sm text-gray-700">
                          <Check size={14} className="text-blue-500 mr-1" />
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* Offers & Jobs Sections */}
            {[
              { title: 'Offers', items: 0 },
              { title: 'Jobs', items: 0 }
            ].map((section) => (
              <div key={section.title} className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-blue-600 uppercase tracking-wide">{brand.name} - {section.title}</h2>
                </div>
                <div className="p-8">
                  <p className="text-gray-500 font-medium">No record Found</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider mb-2">{brand.name}</h2>
            
            {/* Info Box */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 space-y-6">
              <div className="flex justify-center py-4">
                <img src={brand.sidebarLogo} alt={brand.name} className="max-w-full h-auto object-contain max-h-32" />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex items-start space-x-3 text-sm">
                  <Phone className="text-gray-900 mt-1 shrink-0" size={16} />
                  <span className="font-bold">Contact No. : <span className="font-normal text-gray-600">{brand.contact}</span></span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="text-gray-900 mt-1 shrink-0" size={16} />
                  <span className="font-bold">Address : <span className="font-normal text-gray-600">{brand.address}</span></span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    <Clock size={16} />
                    <span>Timings :</span>
                  </div>
                  <div className="bg-gray-50 rounded p-3 space-y-1 text-xs">
                    {brand.timings.map((t) => (
                      <div key={t.day} className="flex justify-between">
                        <span className="font-bold text-gray-700">{t.day}</span>
                        <span className="text-gray-600">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Manager Enquiry Form */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#28313d] px-6 py-4 text-white">
                <h3 className="font-bold uppercase tracking-wider flex items-center gap-2">
                  <Mail size={18} />
                  Manager Enquiry Form
                </h3>
              </div>
              <form className="p-6 space-y-4">
                <div className="space-y-4">
                  {[
                    { label: 'Name', icon: User, placeholder: 'Enter Name' },
                    { label: 'Age', icon: Hash, placeholder: 'Enter Age' },
                    { label: 'Email ID', icon: Mail, placeholder: 'Enter Email' },
                    { label: 'City', icon: MapPin, placeholder: 'Enter City' },
                    { label: 'Mobile No', icon: Phone, placeholder: 'Enter Mobile No' },
                  ].map((field) => (
                    <div key={field.label} className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <field.icon size={14} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                      />
                    </div>
                  ))}
                  <select className="block w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-500 focus:ring-1 focus:ring-brand-primary outline-none bg-white">
                    <option>Select Subject</option>
                    <option>General Enquiry</option>
                    <option>Business Opportunity</option>
                    <option>Offer Details</option>
                  </select>
                  <textarea
                    placeholder="Remarks"
                    rows="3"
                    className="block w-full px-3 py-2 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-brand-primary outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#28313d] hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                >
                   Submit
                </button>
              </form>
            </div>

            {/* Share Social Block */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <Share2 size={18} />
                Share this Outlet
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded text-xs font-bold hover:opacity-90 transition-opacity">
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 px-4 rounded text-xs font-bold hover:opacity-90 transition-opacity">
                  <Share2 size={14} /> Socials
                </button>
              </div>
              <button 
                onClick={handleCopyLink}
                className={`w-full flex items-center justify-center gap-2 border-2 ${copySuccess ? 'border-green-500 text-green-500' : 'border-gray-200 text-gray-700'} py-2 px-4 rounded text-xs font-bold hover:bg-gray-50 transition-all uppercase tracking-widest`}
              >
                {copySuccess ? (
                  <> <Check size={14} /> Link Copied! </>
                ) : (
                  <> <Copy size={14} /> Copy Outlet Link </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OutletDetail;
