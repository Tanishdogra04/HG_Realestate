import React, { useState } from 'react';

const Mail = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const Check = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
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
                      required
                      type="text" 
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <input 
                      required
                      type="email" 
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input 
                      required
                      type="tel" 
                      placeholder="Contact No."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <input 
                      required
                      type="text" 
                      placeholder="City"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <select 
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm text-gray-400"
                  >
                    <option value="" disabled selected>Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="business">Business Opportunity</option>
                    <option value="support">Tenant Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <textarea 
                    required
                    rows="5"
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" required className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-sm text-gray-500">I agree to the <span className="text-blue-600 cursor-pointer">Terms</span> and <span className="text-blue-600 cursor-pointer">Privacy</span>.</span>
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
