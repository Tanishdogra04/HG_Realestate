// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import propertyRouter from './routes/properties.js';
import categoryRouter from './routes/categories.js';
import userRouter from './routes/users.js';
import enquiryRouter from './routes/enquiries.js';
import brandRouter from './routes/brands.js';
import jobRouter from './routes/jobs.js';
import applicationRouter from './routes/applications.js';
import offerRouter from './routes/offers.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/enquiries', enquiryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/offers', offerRouter);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
