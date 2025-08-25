import express from 'express'
import cors from 'cors'
import { serverConfigs } from './configs/serverConfigs.js'
import { userRoutes } from './userRoutes.js'

const app=express()
app.use(cors({
     origin: 'https://vision-path-qdyd0179z-nitinsharma1059-1842s-projects.vercel.app', 
    methods: ['GET','POST','PUT','DELETE'], 
    credentials: true 
}))
app.use(express.json())
app.use('/api',userRoutes)

app.listen(serverConfigs.PORT,()=>{
console.log(`✅ Server running on ${serverConfigs.HOST}:${serverConfigs.PORT}`)
})