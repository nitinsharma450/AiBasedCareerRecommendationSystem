import express from 'express';
import cors from 'cors';
import { serverConfigs } from './configs/serverConfigs.js';
import { userRoutes } from './userRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config()

// CORS configuration
app.use(cors());

app.use(express.json());
  
// Your API routes
app.use('/api', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
