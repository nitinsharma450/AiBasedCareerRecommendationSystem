import express from "express";
import { userApi } from "./controller/userApi.js";
import {userMiddleware} from './middleware/userMiddleware.js'

export const userRoutes = express.Router();


userRoutes.post('/user/signup',userApi.signup)
userRoutes.post('/user/login',userApi.login)

// userRoutes.use(userMiddleware)

userRoutes.post("/user/search", userApi.searchPrompt);
userRoutes.post('/user/details',userApi.search)

