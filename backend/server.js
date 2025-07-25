const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();
const app = express();
console.log('Allowed Origin:', process.env.CLIENT_URL);

app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'https://localhost:5173'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api', userRoutes);
app.use('/api/feedback', feedbackRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
