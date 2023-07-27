const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")

const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/routes');
const User = require('./models/user');

const app = express();



dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://127.0.0.1:5173' }));

const url = process.env.MONGO_URL;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
});

app.use(authMiddleware.authenticateToken);

app.use('/api/auth', authRoutes);

app.get('/test', (req,res) => {
    res.json("test ok");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});