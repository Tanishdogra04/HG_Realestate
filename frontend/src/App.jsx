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
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { brands } from './data/brands';
import { extraBrands } from './data/extraBrands';

function App() {

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
    if (view === 'OUTLET_DETAIL' && data && data.id && !data.name) {
      const allBrands = [...brands, ...extraBrands];
      const foundBrand = allBrands.find(b => b.id === data.brandId || b.id === data.id);
      if (foundBrand) resolvedData = foundBrand;
    }

    setCurrentView(view);
    setSelectedBrand(resolvedData);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App min-h-screen flex flex-col bg-white">
      {currentView !== 'MAP' && (
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
      </main>

      {currentView !== 'MAP' && <Footer />}
    </div>
  );
}

export default App;
