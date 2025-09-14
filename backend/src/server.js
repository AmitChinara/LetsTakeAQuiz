const express = require('express');
require('dotenv').config();

const { connectDB } = require('./db');
const routes = require('./routes');
const path = require('./constants/path');

const app = express();
app.use(express.json());

// Connect DB
connectDB().then().catch(err => console.error(err));

// Admin Routes
app.use(path.ADMIN, routes.adminRoutes);

// API Routes
app.use(path.API, routes.apiRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
