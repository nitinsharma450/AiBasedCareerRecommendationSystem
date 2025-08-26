import express from 'express';
import cors from 'cors';
import { serverConfigs } from './configs/serverConfigs.js';
import { userRoutes } from './userRoutes.js';

const app = express();

// List of allowed origins (local + production)
const allowedOrigins = [
  'http://localhost:3000', // local frontend
  'https://vision-path-qdyd0179z-nitinsharma1059-1842s-projects.vercel.app' // deployed frontend
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Your API routes
app.use('/api', userRoutes);

const PORT = serverConfigs.PORT || 7777;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
