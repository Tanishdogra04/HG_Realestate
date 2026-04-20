// backend/src/scripts/migrateData.js
import mongoose from 'mongoose';
import Brand from '../models/Brand.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const brandData = [
  { id: 'american-tourister', name: 'AMERICAN TOURISTER', image: 'https://hgeaton.com/pimgs/htl/49/americantourist200x150_n.jpg', catId: '2', subCatId: '19', location: 'HUT.', description: 'American Tourister at HG Eaton Plaza offers a wide range of durable and stylish luggage, backpacks, and travel accessories.' },
  { id: 'haldirams', name: "HALDIRAM'S", image: 'https://hgeaton.com/pimgs/htl/75/haldiram200x150_n.jpg', catId: '6', location: 'Food Court', description: "Haldiram's at HG Eaton Plaza is a premier destination for traditional Indian sweets and multi-cuisine dining." },
  { id: 'my-trident', name: 'MY TRIDENT', image: 'https://hgeaton.com/pimgs/htl/22/mytrident200x150_n.jpg', catId: '5', location: 'Main Floor', description: 'My Trident offers premium home textiles, blending contemporary design with timeless craftsmanship.' },
  { id: 'zudio', name: 'ZUDIO', image: 'https://hgeaton.com/pimgs/htl/23/zudio200x150_n.jpg', catId: '1', location: 'Ground Floor', description: 'Zudio is the ultimate fashion destination for trendy and affordable clothing for men, women, and kids.' },
  { id: 'levis', name: 'LEVIS', image: 'https://hgeaton.com/pimgs/htl/24/levis200x150_n.jpg', catId: '1', subCatId: '11', location: 'Ground Floor', description: "Levi's offers the world's most iconic denim, embodying an effortless and timeless aesthetic." },
  { id: 'starbucks', name: 'STARBUCKS', image: 'https://hgeaton.com/pimgs/htl/85/starbuccofee200x150_n.jpg', catId: '6', location: 'Gateway Entrance', description: 'Starbucks offers a premium coffee experience in a warm and inviting environment.' },
  { id: 'mcdonalds', name: 'MCDONALDS', image: 'https://hgeaton.com/pimgs/htl/67/mc200x150_n.jpg', catId: '6', location: 'Gateway Entrance', description: "McDonald's is the favorite spot for quick and delicious meals." },
];

const jobData = [
  { title: 'Store Manager', brandName: 'Zudio', location: 'Ground Floor', type: 'Full-time', catId: '1', subCatId: '11', description: 'Lead the store team, manage inventory, and ensure excellent customer service.', longDescription: 'As a Store Manager at Zudio, you will be responsible for the overall operation of the store.' },
  { title: 'Senior Barista', brandName: 'Starbucks', location: 'Gateway Entrance', type: 'Full-time', catId: '6', subCatId: '30', description: 'Exceed customer expectations by providing premium coffee experiences.', longDescription: 'Starbucks is looking for experienced baristas to join our team.' },
  { title: 'Kitchen Supervisor', brandName: "Haldiram's", location: 'Food Court', type: 'Full-time', catId: '6', subCatId: '31', description: 'Oversee daily kitchen operations and maintain high food quality standards.', longDescription: 'Haldirams is looking for a Kitchen Supervisor to manage food preparation.' },
];

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hg_realestate');
    console.log('✅ Connected to MongoDB');

    // Clean up
    await Brand.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log('🧹 Cleaned existing CRM data');

    // Insert Brands
    const createdBrands = await Brand.insertMany(brandData.map(b => ({
      name: b.name,
      slug: b.id,
      logo: b.image,
      categoryId: b.catId,
      subCategoryId: b.subCatId,
      description: b.description
    })));
    console.log(`🏢 Migrated ${createdBrands.length} Brands`);

    // Insert Jobs
    const jobsToInsert = jobData.map(j => {
      const brand = createdBrands.find(b => b.name === j.brandName);
      return {
        ...j,
        brandId: brand?._id
      };
    });
    const createdJobs = await Job.insertMany(jobsToInsert);
    console.log(`💼 Migrated ${createdJobs.length} Jobs`);

    // Seed some mock Applications
    const mockApps = [
      { job: createdJobs[0]._id, name: 'Tanish Dogra', email: 'tanish@example.com', phone: '9876543210', experience: 4, message: 'I have 4 years of retail experience and would love to join Zudio.' },
      { job: createdJobs[1]._id, name: 'Alice Smith', email: 'alice@example.com', phone: '8765432109', experience: 2, message: 'Passionate about coffee and customer service.' },
    ];
    await Application.insertMany(mockApps);
    console.log('📝 Seeded mock applications');

  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

migrate();
