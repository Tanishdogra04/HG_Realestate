import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Brands from './pages/Brands';
import Outlets from './pages/Outlets';
import Offers from './pages/Offers';
import Jobs from './pages/Jobs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GuideMap from './pages/GuideMap';
import OutletDetail from './pages/OutletDetail';
import LegalPage from './pages/LegalPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { brands } from './data/brands';
import { extraBrands } from './data/extraBrands';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { user, isAdmin, logout } = useAuth();
  const [currentView, setCurrentView] = useState('HOME');
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Standalone Map Mode Check
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'map') {
      setCurrentView('MAP');
    }
  }, []);

  const navigateTo = (view, data = null) => {
    let resolvedData = data;
    
    // If we only have an ID (e.g. from Offers/Jobs), find the full brand object
    if (view === 'OUTLET_DETAIL' && data && (data.id || data._id) && !data.name) {
      const allBrands = [...brands, ...extraBrands];
      const foundBrand = allBrands.find(b => 
        (data.id && (b.id === data.id || b._id === data.id)) || 
        (data.brandId && (b.id === data.brandId || b._id === data.brandId)) ||
        (data._id && (b.id === data._id || b._id === data._id))
      );
      if (foundBrand) resolvedData = foundBrand;
    }

    setCurrentView(view);
    setSelectedBrand(resolvedData);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App min-h-screen flex flex-col bg-white">
      {currentView !== 'MAP' && currentView !== 'ADMIN' && (
        <Navbar 
          currentView={currentView}
          onHomeClick={() => navigateTo('HOME')} 
          onAboutClick={() => navigateTo('ABOUT')}
          onBrandsClick={() => navigateTo('BRANDS')}
          onOutletsClick={() => navigateTo('OUTLETS')}
          onOffersClick={() => navigateTo('OFFERS')}
          onJobsClick={() => navigateTo('JOBS')}
          onContactClick={() => navigateTo('CONTACT')}
          onGalleryClick={() => navigateTo('GALLERY')}
          onLoginClick={() => navigateTo('LOGIN')}
          onAdminClick={() => navigateTo('ADMIN')}
        />
      )}
      
      <main className="flex-grow">
        {currentView === 'ABOUT' && (
          <About onBack={() => navigateTo('HOME')} />
        )}
        {currentView === 'BRANDS' && (
          <Brands onBrandClick={(brand) => navigateTo('OUTLET_DETAIL', brand)} />
        )}
        {currentView === 'OUTLETS' && (
          <Outlets onBrandClick={(brand) => navigateTo('OUTLET_DETAIL', brand)} />
        )}
        {currentView === 'OFFERS' && (
          <Offers onBrandClick={(brand) => navigateTo('OUTLET_DETAIL', brand)} />
        )}
        {currentView === 'JOBS' && (
          <Jobs />
        )}
        {currentView === 'CONTACT' && (
          <Contact />
        )}
        {currentView === 'MAP' && (
          <GuideMap />
        )}
        {currentView === 'GALLERY' && (
          <Gallery onBack={() => navigateTo('HOME')} />
        )}
        {currentView === 'OUTLET_DETAIL' && (
          <OutletDetail brand={selectedBrand} onBack={() => navigateTo('HOME')} />
        )}
        {currentView === 'HOME' && (
          <Home onBrandClick={(brand) => navigateTo('OUTLET_DETAIL', brand)} />
        )}
        {currentView === 'LOGIN' && (
          <Login 
            onSignupClick={() => navigateTo('SIGNUP')} 
            onSuccess={() => navigateTo('HOME')} 
          />
        )}
        {currentView === 'SIGNUP' && (
          <Signup 
            onLoginClick={() => navigateTo('LOGIN')} 
            onSuccess={() => navigateTo('HOME')} 
          />
        )}
        {currentView === 'PRIVACY' && <LegalPage type="privacy" />}
        {currentView === 'TERMS' && <LegalPage type="terms" />}
        {currentView === 'SLA' && <LegalPage type="sla" />}
        {currentView === 'REFUND' && <LegalPage type="refund" />}
        {currentView === 'SHIPPING' && <LegalPage type="shipping" />}
        {currentView === 'ADMIN' && (
          (isAdmin || user?.role === 'tenant') ? (
            <AdminDashboard 
              onLogout={() => { logout(); navigateTo('HOME'); }} 
              onViewSite={() => navigateTo('HOME')}
            />
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500 mb-4">You do not have permission to view this page.</p>
                <button onClick={() => navigateTo('HOME')} className="text-brand-primary font-bold underline">Go Back Home</button>
              </div>
            </div>
          )
        )}
      </main>

      {currentView !== 'MAP' && currentView !== 'ADMIN' && (
        <Footer onLinkClick={navigateTo} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
