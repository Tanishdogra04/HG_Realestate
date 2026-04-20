// backend/src/scripts/totalMigration.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from '../models/Brand.js';
import Job from '../models/Job.js';
import Offer from '../models/Offer.js';
import Application from '../models/Application.js';

dotenv.config({ path: './.env' });
dotenv.config({ path: '../.env' });
dotenv.config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// --- DATA FROM brands.js ---
const brandsMain = [
  { id: 'american-tourister', name: 'AMERICAN TOURISTER', color: 'bg-red-50 text-red-800', image: 'https://hgeaton.com/pimgs/htl/49/americantourist200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/49/americantourist200x150_n.jpg', views: 564, catId: 2, subCatId: 19, location: 'HUT.', categories: ['Men/ Women/ Kids', 'Travel Bags'], description: 'American Tourister at HG Eaton Plaza offers a wide range of durable and stylish luggage, backpacks, and travel accessories.', contact: '9653911509', address: 'HUT., HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '10:00 AM - 10:00 PM' }] },
  { id: 'haldirams', name: "HALDIRAM'S", color: 'bg-red-700 text-white', image: 'https://hgeaton.com/pimgs/htl/75/haldiram200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/75/haldiram200x150_n.jpg', views: 842, catId: 6, location: 'Food Court', categories: ['Food & Beverage', 'Sweets & Snacks'], description: "Haldiram's at HG Eaton Plaza is a premier destination for traditional Indian sweets and multi-cuisine dining.", contact: '1800-102-1202', address: 'Food Court, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '9:00 AM - 11:00 PM' }] },
  { id: 'my-trident', name: 'MY TRIDENT', color: 'bg-yellow-50 text-teal-800', image: 'https://hgeaton.com/pimgs/htl/22/mytrident200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/22/mytrident200x150_n.jpg', views: 315, catId: 5, location: 'Main Floor', categories: ['Home Living', 'Bed & Bath'], description: 'My Trident offers premium home textiles, blending contemporary design with timeless craftsmanship.', contact: '0161-5039999', address: 'Main Floor, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '10:00 AM - 9:00 PM' }] },
  { id: 'zudio', name: 'ZUDIO', color: 'bg-white text-black font-serif', image: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg', views: 2450, catId: 1, location: 'Ground Floor', categories: ['Fashion', 'Apparel & Accessories'], description: 'Zudio is the ultimate fashion destination for trendy and affordable clothing for men, women, and kids.', contact: '080-6759 1234', address: 'Ground Floor, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '10:30 AM - 9:30 PM' }] },
  { id: 'levis', name: 'LEVIS', color: 'bg-red-600 text-white', image: 'https://hgeaton.com/pimgs/htl/24/levis200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/24/levis200x150_n.jpg', views: 720, catId: 1, subCatId: 11, location: 'Ground Floor', categories: ['Fashion', 'Premium Denim'], description: "Levi's offers the world's most iconic denim, embodying an effortless and timeless aesthetic.", contact: '1800-1020-501', address: 'Ground Floor, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '10:00 AM - 9:00 PM' }] },
  { id: 'starbucks', name: 'STARBUCKS', color: 'bg-green-900 text-white', image: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', views: 1250, catId: 6, location: 'Gateway Entrance', categories: ['Cafe', 'Beverages'], description: 'Starbucks offers a premium coffee experience in a warm and inviting environment.', contact: '1860-266-0018', address: 'Gateway Entrance, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '8:00 AM - 11:30 PM' }] },
  { id: 'nik-bakers', name: 'NIK BAKERS', color: 'bg-orange-100 text-orange-900', image: 'https://hgeaton.com/pimgs/htl/70/nikbakkers200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/70/nikbakkers200x150_n.jpg', views: 1100, catId: 6, location: 'Plaza Level', categories: ['Bakery', 'Cafe'], description: 'Nik Bakers is a haven for lovers of artisanal breads, exquisite cakes, and pastries.', contact: '0172-2622222', address: 'Plaza Level, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '9:00 AM - 11:00 PM' }] },
  { id: 'mcdonalds', name: 'MCDONALDS', color: 'bg-yellow-100 text-red-600', image: 'https://hgeaton.com/pimgs/htl/67/mc200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/67/mc200x150_n.jpg', views: 1800, catId: 6, location: 'Gateway Entrance', categories: ['Food & Beverage', 'Fast Food'], description: "McDonald's is the favorite spot for quick and delicious meals.", contact: '011-6600-0666', address: 'Gateway Entrance, HG Eaton Plaza, Handiaya - 148107', timings: [{ day: 'Daily', time: '9:00 AM - 12:00 AM' }] },
];

// --- EXTRA DATA FROM extraBrands.js (Subset for size) ---
const extraBrands = [
  { id: 'adidas', name: 'ADIDAS', image: 'https://hgeaton.com/pimgs/htl/92/addidas200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/92/addidas200x150_n.jpg', views: 890, catId: 2, subCatId: 16, location: 'Ground Floor', description: 'High-performance athletic footwear.', contact: '1800-120-3345', address: 'Ground Floor, HG Eaton Plaza', timings: [{ day: 'Daily', time: '10:00 AM - 10:00 PM' }] },
  { id: 'allen-solly', name: 'ALLEN SOLLY', image: 'https://hgeaton.com/pimgs/htl/81/allensolly200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/81/allensolly200x150_n.jpg', views: 450, catId: 1, location: 'Plaza Level', description: 'Premium casual and formal wear.', contact: '080-6759 1000', address: 'Plaza Level, HG Eaton Plaza', timings: [{ day: 'Daily', time: '10:00 AM - 9:00 PM' }] },
  { id: 'bata', name: 'BATA', image: 'https://hgeaton.com/pimgs/htl/39/bata200x150_n.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/39/bata200x150_n.jpg', views: 920, catId: 2, subCatId: 17, location: 'Ground Floor', description: 'Quality footwear for the family.', contact: '1800-419-2282', address: 'Ground Floor, HG Eaton Plaza', timings: [{ day: 'Daily', time: '10:00 AM - 9:30 PM' }] },
  { id: 'barista', name: 'BARISTA', image: 'https://hgeaton.com/pimgs/htl/133/barista200x150.jpg', sidebarLogo: 'https://hgeaton.com/pimgs/htl/133/barista200x150.jpg', views: 780, catId: 6, location: 'Entrance Level', description: 'Premium Italian coffee experience.', contact: '1800-102-1202', address: 'Entrance Level, HG Eaton Plaza', timings: [{ day: 'Daily', time: '9:00 AM - 11:00 PM' }] },
];

// --- JOBS FROM jobs.js ---
const jobs = [
  { id: 'job-1', title: 'Store Manager', brandName: 'Zudio', brandLogo: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg', location: 'Ground Floor', type: 'Full Time', salary: '₹25,000 - ₹35,000', catId: 1, subCatId: 11, description: 'Lead the store team, manage inventory, and ensure excellent customer service.', longDescription: 'As a Store Manager at Zudio, you will be responsible for the overall operation of the store.' },
  { id: 'job-2', title: 'Senior Barista', brandName: 'Starbucks', brandLogo: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', location: 'Gateway Entrance', type: 'Full Time', salary: '₹18,000 - ₹24,000', catId: 6, subCatId: 30, description: 'Exceed customer expectations by providing premium coffee experiences.', longDescription: 'Starbucks is looking for experienced baristas to join our team.' },
];

// --- OFFERS FROM offers.js ---
const offers = [
  { id: 'offer-metro-shoes', brandId: 'metro-shoes', name: 'METRO SHOES', offerTitle: 'Up to 50% Off', image: 'https://hgeaton.com/pimgs/htl/29/metroshose200x150_n.jpg', logo: 'https://hgeaton.com/pimgs/htl/29/metroshose200x150_n.jpg', catId: 2, subCatId: 17, views: 1200, location: 'Ground Floor', description: 'Special seasonal discount on entire footwear range.' },
  { id: 'offer-starbucks', brandId: 'starbucks', name: 'STARBUCKS', offerTitle: 'Buy 1 Get 1 Free', image: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', logo: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', catId: 6, views: 2500, location: 'Gateway Entrance', description: 'Happy Hours! Buy 1 get 1 free on all tall-sized beverages.' },
];

const totalMigration = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Wipe collections for fresh fidelity start
    await Brand.deleteMany({});
    await Job.deleteMany({});
    await Offer.deleteMany({});
    await Application.deleteMany({});

    console.log('🧹 Cleaned existing CRM data');

    // 1. Migrate Brands (Merged Main + Extra)
    const allBrandsRaw = [...brandsMain, ...extraBrands];
    // Remove duplicates by ID (slug)
    const uniqueBrands = [];
    const seenIds = new Set();
    for (const b of allBrandsRaw) {
      if (!seenIds.has(b.id)) {
        uniqueBrands.push(b);
        seenIds.add(b.id);
      }
    }

    const createdBrands = await Brand.insertMany(uniqueBrands.map(b => ({
      name: b.name,
      slug: b.id,
      logo: b.image || b.sidebarLogo,
      sidebarLogo: b.sidebarLogo,
      color: b.color,
      views: b.views || 0,
      categoryId: b.catId?.toString(),
      subCategoryId: b.subCatId?.toString(),
      location: b.location,
      categories: b.categories || [],
      description: b.description,
      contact: b.contact,
      address: b.address,
      timings: b.timings || [],
      rating: 4.5
    })));
    console.log(`🏢 Migrated ${createdBrands.length} Brands with High Fidelity`);

    // 2. Migrate Jobs
    const createdJobs = await Job.insertMany(jobs.map(j => {
      const b = createdBrands.find(brand => brand.name === j.brandName);
      return {
        title: j.title,
        brandName: j.brandName,
        brandLogo: j.brandLogo,
        brandId: b?._id,
        catId: j.catId?.toString(),
        subCatId: j.subCatId?.toString(),
        type: j.type === 'Full Time' ? 'Full Time' : 'Part Time',
        location: j.location,
        salary: j.salary,
        description: j.description,
        longDescription: j.longDescription,
      };
    }));
    console.log(`💼 Migrated ${createdJobs.length} Jobs`);

    // 3. Migrate Offers
    const createdOffers = await Offer.insertMany(offers.map(o => {
      const b = createdBrands.find(brand => brand.name === o.name);
      return {
        title: o.offerTitle,
        brandName: o.name,
        brandLogo: o.logo,
        brandId: b?._id,
        discount: o.offerTitle,
        description: o.description,
        location: o.location,
        image: o.image
      };
    }));
    console.log(`🎁 Migrated ${createdOffers.length} Offers`);

  } catch (err) {
    console.error('❌ Total Migration failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

totalMigration();
