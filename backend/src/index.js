import express from 'express';
import cors from 'cors';
import { serverConfigs } from './configs/serverConfigs.js';
import { userRoutes } from './userRoutes.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://vision-path.vercel.app', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   
}));



app.use(express.json());

// Your API routes
app.use('/api', userRoutes);

app.listen(serverConfigs.PORT, () => {
    console.log(`✅ Server running on ${serverConfigs.HOST}:${serverConfigs.PORT}`);
});
