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

const allowedOrigins = [
    'https://lets-take-a-quiz.onrender.com',
    'http://localhost:3001' // add more origins here
];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
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
