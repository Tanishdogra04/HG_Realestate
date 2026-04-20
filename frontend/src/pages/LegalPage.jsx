// src/pages/LegalPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LegalPage = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'May 24, 2026',
      sections: [
        { subtitle: 'Data Collection', text: 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.' },
        { subtitle: 'Information Usage', text: 'We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect HG Eaton Plaza and our users.' },
        { subtitle: 'Data Security', text: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.' }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      lastUpdated: 'April 10, 2026',
      sections: [
        { subtitle: 'Agreement to Terms', text: 'By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.' },
        { subtitle: 'Intellectual Property', text: 'The service and its original content, features, and functionality are and will remain the exclusive property of HG Eaton Plaza and its licensors.' },
        { subtitle: 'Termination', text: 'We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.' }
      ]
    },
    sla: {
      title: 'Service Level Agreement',
      lastUpdated: 'June 15, 2026',
      sections: [
        { subtitle: 'Service Availability', text: 'We strive for 99.9% uptime for all tenant portals and digital directories across the plaza.' },
        { subtitle: 'Support Response', text: 'Standard support inquiries are addressed within 24 business hours. Urgent technical issues are escalated immediately to our maintenance team.' }
      ]
    },
    refund: {
      title: 'Refund & Cancellation',
      lastUpdated: 'February 20, 2026',
      sections: [
        { subtitle: 'Event Bookings', text: 'Cancellations made more than 48 hours in advance are eligible for a full refund.' },
        { subtitle: 'Digital Services', text: 'Subscription fees for promotional slots are non-refundable once the campaign has commenced.' }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery',
      lastUpdated: 'January 05, 2026',
      sections: [
        { subtitle: 'Store Pickup', text: 'Most items purchased through brand portals are available for immediate pickup at the respective outlet in HG Eaton Plaza.' },
        { subtitle: 'Home Delivery', text: 'Local delivery within a 10km radius of the plaza is handled by our internal logistics team within 2-4 hours.' }
      ]
    }
  };

  const active = content[type] || content.privacy;

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-24 sm:py-32">
        <div className="container mx-auto px-4 max-w-4xl text-center sm:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Official Documentation</p>
             <h1 className="text-5xl sm:text-6xl font-extrabold text-[#28313d] tracking-tight mb-6">
               {active.title}
             </h1>
             <p className="text-gray-400 font-medium">Last Published: {active.lastUpdated}</p>
          </motion.div>
        </div>
      </div>

      {/* Narrative Content */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-16">
            {active.sections.map((section, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-baseline gap-6">
                   <span className="text-3xl font-serif text-gray-100 font-black">0{idx + 1}</span>
                   <h2 className="text-2xl font-bold text-[#28313d]">{section.subtitle}</h2>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed font-medium pl-14">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm mb-6">Have questions regarding this document?</p>
            <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">
              Contact Compliance Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
