import { Router  } from "express";
import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from "./user.controller";
import authenticate  from "../../middleware/auth-middleware";


const userRouter = Router()


userRouter.post('/register' , registerUser )
userRouter.post('/login' , loginUser )
userRouter.get('/status' , authenticate , (req : any , res : Response)=>{
        const user = req.user
        res.status(200).json({
            success : true ,
            message : "Authenticated" ,
            data : {
                user 
            }
        })
} )



export default userRouter