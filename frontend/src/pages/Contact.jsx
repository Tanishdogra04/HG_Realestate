import React, { useState } from 'react';
import api from '../utils/api';
import { AlertCircle } from 'lucide-react';

const Mail = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const Check = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: '',
    message: '',
    agreed: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Contact number is required';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreed) newErrors.agreed = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/enquiries', formData);
      setIsSuccess(true);
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100 mb-12 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 animate-in slide-in-from-left duration-700">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Main Contact Container */}
        <div className="max-w-6xl mx-auto border border-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-12 animate-in fade-in duration-1000">
          
          {/* Left Column: Info */}
          <div className="md:w-5/12 p-8 md:p-12 lg:p-16 space-y-8 bg-white border-r border-gray-50">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Mail size={32} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#28313d] tracking-tight">
                HG EATON PLAZA
              </h2>
              <div className="space-y-2 text-lg text-gray-600 font-medium">
                <p>NH 7, Handiaya,</p>
                <p>Punjab 148107</p>
              </div>
            </div>

            <p className="text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6">
              Got any questions? Don't hesitate to get in touch.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="md:w-7/12 p-8 md:p-12 lg:p-16 bg-gray-50/30">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#28313d]">Thank you!</h3>
                <p className="text-gray-500">Your message has been sent successfully. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className={`w-full px-4 py-3 bg-white border rounded outline-none transition-all shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="email" 
                      placeholder="Email"
                      className={`w-full px-4 py-3 bg-white border rounded outline-none transition-all shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input 
                      type="tel" 
                      placeholder="Contact No."
                      className={`w-full px-4 py-3 bg-white border rounded outline-none transition-all shadow-sm ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="City"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <select 
                    className={`w-full px-4 py-3 bg-white border rounded outline-none transition-all shadow-sm ${errors.subject ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} ${!formData.subject && 'text-gray-400'}`}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="" disabled>Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="business">Business Opportunity</option>
                    <option value="support">Tenant Support</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                </div>

                <div className="space-y-1">
                  <textarea 
                    rows="5"
                    placeholder="Your message..."
                    className={`w-full px-4 py-3 bg-white border rounded outline-none transition-all shadow-sm resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    />
                    <span className="text-sm text-gray-500">I agree to the <span className="text-blue-600 cursor-pointer">Terms</span> and <span className="text-blue-600 cursor-pointer">Privacy</span>.</span>
                  </div>
                  {errors.agreed && <span className="text-xs text-red-500">{errors.agreed}</span>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className={`w-40 py-3 rounded font-bold uppercase tracking-widest text-white shadow-lg transition-all ${
                    isSubmitting ? 'bg-gray-400' : 'bg-[#28313d] hover:bg-black active:scale-95'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-100 h-[450px] relative animate-in slide-in-from-bottom duration-1000 delay-300">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27471.21855688975!2d75.52554707572714!3d30.366750003055964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910c558c494ce51%3A0xc32c451559c3a388!2sHG%20Eaton%20Plaza!5e0!3m2!1sen!2sin!4v1713444444444!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="HG Eaton Plaza Project Area"
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
