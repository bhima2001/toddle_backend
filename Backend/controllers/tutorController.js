import Tutor from '../models/tutorModel'
import sendToken from '../utils/jwtToken'
import File from '../models/fileModel'
import Class from '../models/classModel'




//REGISTER A TUTOR
export const registerTutor=async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
    const tutor=await Tutor.create({
        name,email,password
    })
    sendToken(tutor,201,res);
}



//LOGIN AS TUTOR
export const loginTutor=async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"email or password is missing"
        })
    }

    const tutor=await Tutor.findOne({email}).select('+password');

    if(!tutor){
        return res.status(404).json({
            success:false,
            message:'Tutor Not Found'
        })
    }
    console.log(password)
    const isPasswordMatched=await tutor.comparePassword(password);


    if(!isPasswordMatched){
        return res.status(401).json({
            success:false,
            message: 'Password mismatch'
        })
    }
    sendToken(tutor,200,res);
}



//LOGOUT TUTOR
export const logoutTutor=async(req,res,next)=>{
    const {token}=req.cookies
    console.log(token)
    if(!token){
        return res.status(409).json({
            success:false,
            message:"No tutor to logout"
        })
    }
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Tutor Logged Out"
    })
}



//GET ALL TUTORS -- ADMIN ROUTE
export const getAllTutors=async (req,res,next)=>{
    const tutors=await Tutor.find();

    res.status(200).json({
        success:true,
        tutors
    })
}



//GET ALL CLASSES CREATED BY A TUTOR -- TUTOR
export const allClassesCreated=async(req,res,next)=>{
    const {tutorId}=req.tutor._id;
    const tutor=await Tutor.findById(tutorId).populate('classCreated').exec();
    console.log(tutor)
   res.status(200).json({
    success:true,
    message:"The Class Created by this tutor are",
    classes:tutor.classCreated
   })

}




//GET ALL FILES UPLOADED BY A TUTOR -- TUTOR
export const allFilesCreated=async(req,res,next)=>{
    const tutorId=req.tutor._id;
    const {classId}=req.params;
    const {search,type}=req.query;
    const tempClass=await Class.findById(classId);

    if(String(tutorId)!==String(tempClass.createdBy)){
        return res.status(401).json({
            success:false,
            message:"Sorry but this is not your class"
        })
    }
    const allFiles=await Class.findById(classId).populate('files').exec();

    let outputFiles=allFiles

    if(search){
        outputFiles=allFiles.files.filter(file=>{
            return search.slice(1,-1)===file.name;
        })
    }
    if(type){

        outputFiles=outputFiles.filter(file=>file.fileType===type.slice(1,-1))
    }
    // }
    res.status(200).json({
        success:true,
        message:"All Files created by this teacher",
        files:outputFiles
    })
}
