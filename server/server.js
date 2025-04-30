const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const videoRoutes = require('./routes/videos');
require('./cron/fetchVideo');  

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/videos', videoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.error('MongoDB connection error:', err));
