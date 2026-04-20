import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI || (isProduction ? null : 'mongodb://localhost:27017/hg_realestate'),
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
};
