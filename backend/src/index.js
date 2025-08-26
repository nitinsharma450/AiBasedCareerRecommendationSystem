import express from 'express';
import cors from 'cors';
import { serverConfigs } from './configs/serverConfigs.js';
import { userRoutes } from './userRoutes.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://vision-path-qdyd0179z-nitinsharma1059-1842s-projects.vercel.app', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
   
}));



app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render!");
});

// Your API routes
app.use('/api', userRoutes);

const PORT =  serverConfigs.PORT || 7777;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

