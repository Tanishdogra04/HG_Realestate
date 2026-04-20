// backend/src/scripts/seedElite.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from '../models/Brand.js';
import Job from '../models/Job.js';
import Offer from '../models/Offer.js';
import Application from '../models/Application.js';
import Property from '../models/Property.js';
import Enquiry from '../models/Enquiry.js';
import Category from '../models/Category.js';

dotenv.config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hg_realestate';

const seedElite = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for High-Fidelity Seeding');

    // Clean existing data
    await Brand.deleteMany({});
    await Job.deleteMany({});
    await Offer.deleteMany({});
    await Application.deleteMany({});
    await Property.deleteMany({});
    await Enquiry.deleteMany({});
    await Category.deleteMany({});

    console.log('🧹 Database sanitized');

    // 0. CREATE CATEGORIES
    const categories = [
      { name: 'Residential', slug: 'residential' },
      { name: 'Commercial', slug: 'commercial' },
      { name: 'Retail', slug: 'retail' }
    ];
    const createdCats = await Category.insertMany(categories);
    const getCatId = (name) => createdCats.find(c => c.name === name)?._id;

    // 1. HIGH-FIDELITY BRANDS
    const eliteBrands = [
      { 
        name: 'ZUDIO', 
        slug: 'zudio', 
        logo: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg', 
        sidebarLogo: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg',
        color: 'bg-white text-black border-2 border-gray-100',
        location: 'Ground Floor', 
        description: 'Zudio is a fashion brand that offers trendy and affordable apparel for men, women, and kids.', 
        views: 2540,
        contact: '080-6759 1234',
        address: 'Ground Floor, HG Eaton Plaza, Handiaya, Barnala, Punjab 148107',
        categories: ['Fashion', 'Apparel', 'Essentials'],
        timings: [{ day: 'Daily', time: '10:30 AM - 9:30 PM' }],
        website: 'https://www.zudio.com'
      },
      { 
        name: 'STARBUCKS', 
        slug: 'starbucks', 
        logo: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', 
        sidebarLogo: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg',
        color: 'bg-green-900 text-white',
        location: 'Gateway Entrance', 
        description: 'Providing the finest coffee experience in the world, one cup and one neighborhood at a time.', 
        views: 1820,
        contact: '1860-266-0018',
        address: 'Gateway Entrance, HG Eaton Plaza, Handiaya, Barnala, Punjab 148107',
        categories: ['Cafe', 'Beverages', 'Bakery'],
        timings: [{ day: 'Daily', time: '8:00 AM - 11:30 PM' }],
        website: 'https://www.starbucks.in'
      },
      { 
        name: 'NIKE', 
        slug: 'nike', 
        logo: 'https://hgeaton.com/pimgs/htl/92/addidas200x150_n.jpg', 
        color: 'bg-black text-white',
        location: 'First Floor', 
        description: 'Empowering athletes worldwide with innovative footwear and apparel.', 
        views: 3200,
        contact: '1800-102-1202',
        address: 'First Floor, HG Eaton Plaza, Handiaya, Barnala',
        categories: ['Sportswear', 'Footwear'],
        timings: [{ day: 'Daily', time: '10:00 AM - 10:00 PM' }]
      },
      { 
        name: 'HALDIRAM', 
        slug: 'haldiram', 
        logo: 'https://hgeaton.com/pimgs/htl/75/haldiram200x150_n.jpg', 
        color: 'bg-red-700 text-white',
        location: 'Food Court', 
        description: 'Traditional Indian sweets and multi-cuisine restaurant.', 
        views: 900,
        contact: '1800-102-1202',
        address: 'Food Court, HG Eaton Plaza, Handiaya',
        categories: ['Dining', 'Sweets'],
        timings: [{ day: 'Daily', time: '9:00 AM - 11:00 PM' }]
      }
    ];
    const createdBrands = await Brand.insertMany(eliteBrands);
    console.log(`🏢 Created ${createdBrands.length} High-Fidelity Brands`);

    // 2. HIGH-FIDELITY JOBS
    const eliteJobs = [
      { 
        title: 'Store Manager', 
        brandName: 'ZUDIO', 
        type: 'Full Time', 
        location: 'HG Eaton Plaza', 
        salary: '₹45,000 - ₹55,000', 
        description: 'Oversee store operations and team management.',
        longDescription: 'As a Store Manager at Zudio, you will be responsible for driving sales performance, inventory management, and leading a high-performing team in a fast-paced fashion environment.'
      },
      { 
        title: 'Barista', 
        brandName: 'STARBUCKS', 
        type: 'Part Time', 
        location: 'HG Eaton Plaza', 
        salary: '₹15,000 - ₹20,000', 
        description: 'Craft incredible coffee and connections.',
        longDescription: 'Starbucks baristas provide a legendary experience. You will be trained in the art of coffee crafting and customer service excellence.'
      }
    ];
    const createdJobs = await Job.insertMany(eliteJobs.map(j => ({
      ...j,
      brandId: createdBrands.find(b => b.name === j.brandName)?._id,
      brandLogo: createdBrands.find(b => b.name === j.brandName)?.logo
    })));
    console.log(`💼 Created ${createdJobs.length} Detailed Jobs`);

    // 3. HIGH-FIDELITY OFFERS
    const eliteOffers = [
      { 
        title: 'Summer Flash Sale', 
        brandName: 'ZUDIO', 
        discount: 'UP TO 50% OFF', 
        expiryDate: '30 May 2026',
        description: 'Exclusive discounts on the new summer collection.', 
        terms: 'Applicable on select merchandise only. Valid till stocks last.',
        image: createdBrands.find(b => b.name === 'ZUDIO')?.logo 
      },
      { 
        title: 'BOGO Beverages', 
        brandName: 'STARBUCKS', 
        discount: 'BUY 1 GET 1', 
        expiryDate: 'Ongoing',
        description: 'Happy hours are back! Buy any tall beverage and get one free.', 
        terms: 'Valid on Mon-Wed, 4 PM to 7 PM only.',
        image: createdBrands.find(b => b.name === 'STARBUCKS')?.logo 
      }
    ];
    const createdOffers = await Offer.insertMany(eliteOffers.map(o => ({
       ...o,
       brandId: createdBrands.find(b => b.name === o.brandName)?._id,
       brandLogo: createdBrands.find(b => b.name === o.brandName)?.logo
    })));
    console.log(`🎁 Created ${createdOffers.length} Integrated Offers`);

    // 4. REAL ESTATE ASSETS
    const eliteProperties = [
      { 
        title: 'Luxury Office Suite 101', 
        description: 'Premium office space with high-speed internet and panoramic views.', 
        price: 1550000, 
        location: 'Block A, HG Eaton Plaza', 
        category: getCatId('Commercial'),
        amenities: ['24/7 Power Backup', 'Fiber Internet', 'Basement Parking'],
        specs: { "Area": "2500 Sq.Ft", "Floor": "5th", "Connectivity": "Direct Elevator" }
      },
      { 
        title: 'Retail Frontage Unit', 
        description: 'High-visibility retail space directly facing the main entrance.', 
        price: 3200000, 
        location: 'Ground Floor, HG Eaton Plaza', 
        category: getCatId('Retail'),
        amenities: ['Central Air Conditioning', 'CCTV Security'],
        specs: { "Area": "1200 Sq.Ft", "Frontage": "30 Ft", "Power": "High Voltage" }
      }
    ];
    await Property.insertMany(eliteProperties);
    console.log('🏠 Created Real Estate Assets');

    // 5. CRM FLOW
    const eliteApps = [
      { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', experience: '5', message: 'I have managed retail stores for 5 years.', job: createdJobs[0]._id },
      { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', experience: '2', message: 'Love the Starbucks culture!', job: createdJobs[1]._id }
    ];
    await Application.insertMany(eliteApps);

    const eliteEnquiries = [
      { name: 'Sandeep Bansal', email: 'sandeep@invest.com', message: 'Interested in the commercial office space for a new tech hub.' },
    ];
    await Enquiry.insertMany(eliteEnquiries);

    console.log('✨ HIGH-FIDELITY SEEDING COMPLETE');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedElite();
