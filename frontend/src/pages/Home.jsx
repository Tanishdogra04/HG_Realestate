import React from 'react';
import Hero from '../components/layout/home/Hero';
import BrandGrid from '../components/layout/home/BrandGrid';

const Home = (props) => {
  return (
    <div className="flex flex-col bg-gray-50">
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 mt-4">
          <Hero />
        </div>
        <div className="container mx-auto px-4 mt-12">
          <BrandGrid onBrandClick={props.onBrandClick} />
        </div>
      </main>
    </div>
  );
};

export default Home;
