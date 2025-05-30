require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes    = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// mount API routes
app.use('/api/auth',    authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;