const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

require('dotenv').config();

const { connectDB } = require('./db');
const routes = require('./routes');
const path = require('./constants/path');

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Allow CORS from your frontend
app.use(cors({
    origin: 'https://lets-take-a-quiz.onrender.com', // frontend origin
    credentials: true // allows cookies to be sent
}));

// Connect DB
connectDB().then().catch(err => console.error(err));

// Admin Routes
app.use(path.ADMIN, routes.adminRoutes);

// API Routes
app.use(path.API, routes.apiRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
