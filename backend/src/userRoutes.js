import express from 'express'
import  {userApi}  from './controller/userApi.js'

export const userRoutes=express.Router()

userRoutes.post('/user/search',userApi.searchPrompt)