// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, AlertCircle, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = ({ onSignupClick, onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const res = await login(formData.email, formData.password);
    setIsLoading(false);

    if (res.success) {
      toast.success('Access Granted! Welcome to the portal.');
      onSuccess();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mb-32" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-brand-dark/5 border border-white overflow-hidden relative z-10"
      >
        {/* Left Visual Side (Mirrored for Login) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-brand-dark text-white relative">
           <img src="https://hgeaton.com/images/logo_bl.png" className="w-28 brightness-0 invert opacity-60" alt="Logo" />
           <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">Welcome <br/><span className="text-brand-primary italic">Back.</span></h2>
              <p className="text-gray-400 font-medium">Continue managing your assets and connecting with the elite ecosystem of HG Eaton Plaza.</p>
           </div>
           <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary"><Sparkles size={20}/></div>
                 <div className="text-xs font-bold text-gray-300 uppercase tracking-widest leading-loose">Premium Portal Access</div>
              </div>
           </div>
        </div>

        {/* Form Side */}
        <div className="p-8 sm:p-12 text-left">
           <div className="mb-12">
              <div className="flex items-center gap-2 text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-3">
                 <Lock size={12} /> Secure Authentication
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h1>
              <p className="text-gray-400 font-medium mt-2">Enter your corporate credentials</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                 <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-brand-primary">Corporate Email</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors" size={18} />
                       <input 
                         type="email" 
                         placeholder="name@company.com"
                         className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-brand-primary focus:bg-white'}`}
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-2 group">
                    <div className="flex justify-between items-center px-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-brand-primary">Security Token</label>
                       <button type="button" className="text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-wide">ID Recovery</button>
                    </div>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors" size={18} />
                       <input 
                         type="password" 
                         className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-transparent focus:border-brand-primary focus:bg-white'}`}
                         placeholder="••••••••"
                         value={formData.password}
                         onChange={e => setFormData({...formData, password: e.target.value})}
                       />
                    </div>
                 </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-brand-dark/10 group group-disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <>Authorize Hub Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="pt-6 text-center">
                 <p className="text-sm font-medium text-gray-500">
                    Not a member yet? {' '}
                    <button type="button" onClick={onSignupClick} className="text-brand-primary font-bold hover:underline">Register Brand</button>
                 </p>
              </div>
           </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
