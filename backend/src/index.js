import express from 'express';
import cors from 'cors';
import { serverConfigs } from './configs/serverConfigs.js';
import { userRoutes } from './userRoutes.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Your API routes
app.use('/api', userRoutes);

const PORT = serverConfigs.PORT || 7777;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
