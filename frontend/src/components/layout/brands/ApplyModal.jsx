import React, { useState } from 'react';

const CloseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const ApplyModal = ({ job, isOpen, onClose, mode = 'apply' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormState({ name: '', email: '', phone: '', experience: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-xl font-extrabold text-[#28313d]">
              {mode === 'apply' ? 'Submit Application' : 'Job Details'}
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              {job.title} @ <span className="text-[#0c9a50]">{job.brandName}</span>
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-[#0c9a50]/10 text-[#0c9a50] rounded-full flex items-center justify-center mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h4 className="text-2xl font-bold text-[#28313d]">Application Sent!</h4>
              <p className="text-gray-500">Your profile has been shared with the HR team at {job.brandName}. We will contact you soon.</p>
              <button 
                onClick={handleClose}
                className="mt-6 bg-[#0c9a50] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0a8545] transition-all"
              >
                Close
              </button>
            </div>
          ) : mode === 'apply' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:border-[#0c9a50] focus:ring-1 focus:ring-[#0c9a50] outline-none transition-all text-sm"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:border-[#0c9a50] focus:ring-1 focus:ring-[#0c9a50] outline-none transition-all text-sm"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:border-[#0c9a50] focus:ring-1 focus:ring-[#0c9a50] outline-none transition-all text-sm"
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Exp (Years)</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:border-[#0c9a50] focus:ring-1 focus:ring-[#0c9a50] outline-none transition-all text-sm"
                    placeholder="2"
                    value={formState.experience}
                    onChange={(e) => setFormState({...formState, experience: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Why join us?</label>
                <textarea 
                  rows="3" 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:border-[#0c9a50] focus:ring-1 focus:ring-[#0c9a50] outline-none transition-all text-sm resize-none"
                  placeholder="Tell us about yourself..."
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-extrabold uppercase tracking-widest text-sm transition-all shadow-lg ${
                  isSubmitting ? 'bg-gray-300 transform-none' : 'bg-[#0c9a50] text-white hover:bg-[#0a8545] hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Submit Now'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 italic text-gray-600 text-[14px] leading-relaxed">
                "{job.longDescription}"
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                   <div className="text-[10px] font-bold text-gray-400 uppercase">Location</div>
                   <div className="text-gray-700 font-bold">{job.location}</div>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] font-bold text-gray-400 uppercase">Employment</div>
                   <div className="text-gray-700 font-bold">{job.type}</div>
                </div>
              </div>

              <button 
                onClick={() => {}} // This will be handled by Parent to switch mode
                className="hidden"
              ></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
