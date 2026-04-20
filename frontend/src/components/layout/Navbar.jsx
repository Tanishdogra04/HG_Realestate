import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, LogIn, Lock } from 'lucide-react';

// Custom Icons to avoid dependency issues with lucide-react in this environment
const MenuIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const XIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const FacebookIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const InstagramIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Navbar = ({ onHomeClick, onAboutClick, onBrandsClick, onOutletsClick, onOffersClick, onJobsClick, onContactClick, onGalleryClick, onLoginClick, onAdminClick, currentView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    
    const handleLinkClick = (e, item) => {
        e.preventDefault();
        
        if (item.view === 'HOME' && onHomeClick) {
            onHomeClick();
        } else if (item.view === 'ABOUT' && onAboutClick) {
            onAboutClick();
        } else if (item.view === 'BRANDS' && onBrandsClick) {
            onBrandsClick();
        } else if (item.view === 'OUTLETS' && onOutletsClick) {
            onOutletsClick();
        } else if (item.view === 'OFFERS' && onOffersClick) {
            onOffersClick();
        } else if (item.view === 'JOBS' && onJobsClick) {
            onJobsClick();
        } else if (item.view === 'MAP') {
            window.open(window.location.origin + window.location.pathname + '?view=map', '_blank');
            return;
        } else if (item.view === 'CONTACT' && onContactClick) {
            onContactClick();
        } else if (item.view === 'GALLERY' && onGalleryClick) {
            onGalleryClick();
        } else if (item.view === 'LOGIN' && onLoginClick) {
            onLoginClick();
        } else if (item.view === 'ADMIN' && onAdminClick) {
            onAdminClick();
        } else if (item.view === 'SIGNUP' && onLoginClick) {
            onLoginClick(); // Re-use login modal state but can be refined
        }
        
        setIsMenuOpen(false);
    };

    const navItems = [
        { label: 'Home', path: '/', view: 'HOME' },
        { label: 'About US', path: '/about', view: 'ABOUT' },
        { label: 'Gallery', path: '/gallery', view: 'GALLERY' },
        { label: 'Brands', path: '/brands', view: 'BRANDS' },
        { label: 'Outlets', path: '/outlets', view: 'OUTLETS' },
        { label: 'Offers', path: '/offers', view: 'OFFERS' },
        { label: 'Jobs', path: '/jobs', view: 'JOBS' },
        { label: 'Guide Map', path: '/guide-map', view: 'MAP' },
        { label: 'Contact us', path: '/contact', view: 'CONTACT' },
        ...(!user || user.role === 'user' ? [{ label: 'List Your Brand', path: '/signup', view: 'SIGNUP', secondary: true }] : []),
        ...(isAdmin || user?.role === 'tenant' ? [{ label: 'Dashboard', path: '/admin', view: 'ADMIN', icon: Lock }] : [])
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-2">
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 md:col-span-5 flex items-center">
                        <a 
                            href="/" 
                            onClick={(e) => handleLinkClick(e, { path: '/', view: 'HOME' })}
                            className="inline-block transition-transform hover:scale-105 duration-300"
                        >
                            <img 
                                src="https://hgeaton.com/images/logo_bl.png" 
                                alt="HG Eaton Plaza" 
                                className="w-[100px] md:w-[120px] h-auto object-contain"
                            />
                        </a>
                    </div>

                    <div className="hidden md:block md:col-span-4"></div>

                    <div className="col-span-4 md:col-span-3 flex justify-end items-center gap-4">
                        <nav className="hidden sm:flex space-x-3 items-center">
                            {[
                                { name: 'facebook', href: 'https://www.facebook.com/profile.php?id=100088185347216', color: 'bg-[#3b5998]', Icon: FacebookIcon },
                                { name: 'instagram', href: 'https://www.instagram.com/hgeatonplaza/', color: 'bg-[#e4405f]', Icon: InstagramIcon }
                            ].map((social) => (
                                <a 
                                    key={social.name}
                                    href={social.href} 
                                    className={`group relative ${social.color} w-8 h-8 rounded text-white transition-all duration-300 overflow-hidden block`}
                                >
                                    <div className="flex flex-col items-center transition-transform duration-300 ease-in-out group-hover:-translate-y-8">
                                        <div className="h-8 w-8 flex items-center justify-center">
                                            <social.Icon size={16} />
                                        </div>
                                        <div className="h-8 w-8 flex items-center justify-center">
                                            <social.Icon size={16} />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </nav>

                        <div className="hidden sm:flex items-center gap-2">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                                        <div className="w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center text-white">
                                            <User size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">{user.name.split(' ')[0]}</span>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogIn size={20} className="rotate-180" />
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={onLoginClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded text-xs font-bold hover:bg-black transition-all shadow-sm"
                                >
                                    <LogIn size={14} />
                                    LOGIN
                                </button>
                            )}
                        </div>

                        <button 
                            onClick={toggleMenu}
                            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <nav className="bg-[#28313d] py-2 hidden md:block">
                <div className="container mx-auto px-4">
                    <ul className="flex flex-wrap justify-start items-center text-white text-sm font-medium">
                        {navItems.map((item, index) => (
                            <li key={item.label} className="flex items-center">
                                <a
                                    href={item.path}
                                    onClick={(e) => handleLinkClick(e, item)}
                                    className={`px-4 py-1.5 border-2 transition-all hover:border-white rounded-none ${currentView === item.view ? 'border-white bg-white text-[#28313d]' : 'border-transparent'} ${item.secondary ? 'text-brand-primary font-bold' : ''}`}
                                >
                                    {item.label}
                                </a>
                                {index < navItems.length - 1 && (
                                    <span className="mx-1 text-gray-400 font-light opacity-50">|</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className={`md:hidden bg-[#28313d] transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="container mx-auto px-4 py-6">
                    <ul className="flex flex-col space-y-4 text-white text-lg font-medium text-center">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.path}
                                    onClick={(e) => handleLinkClick(e, item)}
                                    className={`block py-2.5 rounded-none transition-all duration-200 ${currentView === item.view ? 'bg-white text-[#28313d] font-bold shadow-md' : 'text-white hover:bg-white/10'}`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}

                        {/* Mobile Auth Items */}
                        <li className="pt-6 border-t border-white/10">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-3 text-white">
                                        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                        <span className="font-bold">{user.name}</span>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="w-full py-3 bg-red-500/20 text-red-400 rounded font-bold flex items-center justify-center gap-2"
                                    >
                                        <LogIn size={18} className="rotate-180" />
                                        LOGOUT
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={onLoginClick}
                                    className="w-full py-3 bg-brand-primary text-white rounded font-bold flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <LogIn size={18} />
                                    LOGIN / JOIN
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
