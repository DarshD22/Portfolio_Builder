require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }));
app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve uploads statically
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/portfolios', require('./routes/portfolioRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
