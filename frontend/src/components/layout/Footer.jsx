import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#28313d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Left Column: Logo and Tagline */}
        <div className="space-y-8">
          <img 
            src="https://hgeaton.com/images/logo_bl.png" 
            alt="HG Eaton Plaza" 
            className="h-16 w-auto object-contain brightness-0 invert"
          />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-300">Get The Best Discounts On</p>
            <p className="text-lg font-medium text-gray-300">Premium+ Outlets</p>
          </div>
        </div>

        {/* Middle Column: Useful Links */}
        <div className="md:pl-12">
          <h4 className="text-xl font-bold mb-6 tracking-wide">Useful Links</h4>
          <ul className="grid grid-cols-1 gap-3 text-base text-white">
            {[
              'Outlet Login', 'About Us', 'Contact Us', 'Privacy Polices', 
              'Terms and Conditions', 'Service Level Aggrement', 
              'Refunds and Cancellation', 'Shipping and Delivery'
            ].map((link) => (
              <li key={link}>
                <a href="#" className="hover:opacity-80 transition-opacity block py-1">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Notifications & Updates */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold tracking-wide">For Notifications & Updates</h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email Address Here.." 
                className="flex-grow bg-white text-gray-800 px-4 py-3 rounded text-sm outline-none placeholder:text-gray-400"
              />
              <input 
                type="text" 
                placeholder="Contact No." 
                className="w-full sm:w-40 bg-white text-gray-800 px-4 py-3 rounded text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            <button className="bg-[#15803d] hover:bg-green-700 text-white font-bold py-3 px-8 rounded transition-all uppercase tracking-widest text-sm inline-block">
              Subscribe
            </button>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              We'll never share your details. See our <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <p>© 2026 All Rights Reserved - HG EATON PLAZA</p>
      </div>
    </footer>
  );
};

export default Footer;
