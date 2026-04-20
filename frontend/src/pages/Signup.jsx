// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, AlertCircle, ArrowRight, Loader2, Store, Users, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = ({ onLoginClick, onSuccess }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: 'user' // Default to simple user
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const res = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    setIsLoading(false);

    if (res.success) {
      toast.success(formData.role === 'tenant' ? 'Welcome, Merchant! Let\'s build your brand.' : 'Welcome to the platform!');
      onSuccess();
    } else {
      toast.error(res.message);
    }
  };

  const roleOptions = [
    { id: 'user', label: 'I am a Customer', icon: Users, desc: 'Browse brands and apply for jobs' },
    { id: 'tenant', label: 'I am an Outlet Owner', icon: Store, desc: 'List your brand and manage hiring' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-brand-dark/5 border border-white overflow-hidden relative z-10"
      >
        {/* Visual Brand Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-brand-dark text-white relative">
           <img src="https://hgeaton.com/images/logo_bl.png" className="w-28 brightness-0 invert opacity-60" alt="Logo" />
           <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">Join the Elite <br/><span className="text-brand-primary italic">Plaza Circle.</span></h2>
              <p className="text-gray-400 font-medium">Connect with premium brands and premium spaces in North India's finest commercial hub.</p>
           </div>
           <div className="space-y-4">
              {['Secure Encryption', 'Real-time Analytics', 'Brand Loyalty'].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                   <CheckCircle2 size={16} className="text-brand-primary" />
                   {item}
                </div>
              ))}
           </div>
        </div>

        {/* Form Side */}
        <div className="p-8 sm:p-12 overflow-y-auto max-h-[85vh] custom-scrollbar text-left">
           <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
              <p className="text-gray-400 font-medium mt-2">Start your journey at HG Eaton Plaza</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              {/* Role Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {roleOptions.map(option => (
                   <button
                     key={option.id}
                     type="button"
                     onClick={() => setFormData({...formData, role: option.id})}
                     className={`p-4 rounded-3xl border-2 transition-all text-left relative group ${formData.role === option.id ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                   >
                     <option.icon size={24} className={formData.role === option.id ? 'text-brand-primary' : 'text-gray-400'} />
                     <h3 className={`mt-3 font-extrabold text-sm ${formData.role === option.id ? 'text-gray-900' : 'text-gray-500'}`}>{option.label}</h3>
                     <p className="text-[10px] text-gray-400 mt-1 font-medium">{option.desc}</p>
                     {formData.role === option.id && (
                        <div className="absolute top-3 right-3 text-brand-primary">
                           <CheckCircle2 size={16} />
                        </div>
                     )}
                   </button>
                 ))}
              </div>

              <div className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                       <input 
                         type="text" 
                         placeholder="Jane Cooper"
                         className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.name ? 'border-red-500' : 'border-transparent focus:border-brand-primary focus:bg-white'}`}
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                       <input 
                         type="email" 
                         placeholder="jane@shop.com"
                         className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.email ? 'border-red-500' : 'border-transparent focus:border-brand-primary focus:bg-white'}`}
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                       <input 
                         type="password" 
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary focus:bg-white transition-all"
                         placeholder="••••••••"
                         value={formData.password}
                         onChange={e => setFormData({...formData, password: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                       <input 
                         type="password" 
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary focus:bg-white transition-all"
                         placeholder="••••••••"
                         value={formData.confirmPassword}
                         onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                       />
                    </div>
                 </div>
                 {errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password}</p>}
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-brand-dark/10"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <>Create Account <ArrowRight size={18} /></>
                )}
              </button>

              <p className="text-center text-sm font-medium text-gray-500">
                Already part of the circle? {' '}
                <button type="button" onClick={onLoginClick} className="text-brand-primary font-bold hover:underline">Sign In</button>
              </p>
           </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
