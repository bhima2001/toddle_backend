import jwt from 'jsonwebtoken'
import Tutor from '../models/tutorModel'
import Student from '../models/studentModel'


export const isAuthenticatedTutor=async(req,res,next)=>{

    const {token}=req.cookies;
    console.log(req.cookies)
    if(!token){
        return res.status(401).json({
            success: false,
            message:"Please login to have access to this content"
        })
    }

    const data=jwt.verify(token,process.env.JWT_SECRET);

    req.tutor=await Tutor.findById(data.id);
    
    next();
}

export const isAuthenticatedStudent=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return res.status(400).json({
            success: false,
            message:"Please login to have access to this content"
        })
    }

    const data=jwt.verify(token,process.env.JWT_SECRET);

    req.student=await Student.findById(data.id);
    
    next();
}