import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/users.js';
import { productRoutes } from './routes/products.js';
import { categoryRoutes } from './routes/categories.js';
import { customPcRoutes } from './routes/customPcs.js';
import { cartRoutes } from './routes/carts.js';
import { orderRoutes } from './routes/orders.js';
import { invoiceRoutes } from './routes/invoices.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB-tilkobling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Øk timeout til 30 sekunder
    });
    console.log('Tilkoblet MongoDB');
  } catch (error) {
    console.error('MongoDB tilkoblingsfeil:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors("*"));
app.use(express.json());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/custom-pcs', customPcRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use(errorHandler);

const startServer = async (port) => {
  try {
    await connectDB();  // Koble til MongoDB før serveren starter
    app.listen(port, () => {
      console.log(`Server kjører på port ${port}`);
    });
  } catch (error) {
    console.error('Kunne ikke starte serveren:', error);
    process.exit(1);
  }
};

startServer(PORT);