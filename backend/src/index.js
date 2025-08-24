import express from 'express'
import cors from 'cors'
import { serverConfigs } from './configs/serverConfigs.js'
import { userRoutes } from './userRoutes.js'

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',userRoutes)

app.listen(serverConfigs.PORT,()=>{
console.log(`✅ Server running on ${serverConfigs.HOST}:${serverConfigs.PORT}`)
})