require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // You can also use express's built-in body parser: app.use(express.json())

// Connect to the Database
connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Root Route for Testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
