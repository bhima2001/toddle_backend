import Student from '../models/studentModel.js'
import sendToken from '../utils/jwtToken.js'
import Class from '../models/classModel.js'




//REGISTER A STUDENT
export const registerStudent=async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
    const student=await Student.create({
        name,email,password
    })
    sendToken(student,201,res,"Successfully registered student");
}



//STUDENT LOGIN
export const loginStudent=async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"email or password is missing"
        })
    }

    const student=await Student.findOne({email}).select('+password');

    if(!student){
        return res.status(404).json({
            success:false,
            message:'Student Not Found'
        })
    }
    console.log(password)
    const isPasswordMatched=await student.comparePassword(password);


    if(!isPasswordMatched){
        return res.status(401).json({
            success:false,
            message: 'Password mismatch'
        })
    }

    sendToken(student,200,res,"Successfully Logged in");
}



//STUDENT LOGOUT
export const logoutStudent=async(req,res,next)=>{
    if(!req.cookie){
        return res.status(409).json({
            success:false,
            message:"No user to logout"
        })
    }
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Student Logged Out"
    })
}


//GET ALL STUDENTS -- TUTOR
export const getAllStudents=async (req,res,next)=>{
    const students=await Student.find();

    res.status(200).json({
        success:true,
        students
    })
}



//ALL CLASSES JOINED BY STUDENT -- STUDENT
export const allClassesIn=async(req,res,next)=>{
    const studentId=req.student._id;

    const student=await Student.findById(studentId).populate('classesIn').exec();

    const classes=student.classesIn;

    res.status(200).json({
        success:true,
        message:"The Classes this student is in are",
        classes
    })
}



//GET ALL FILES ACCESSIBLE TUTOR ALONG WITH TWO FILTERS i.e. SEARCH WORD AND TYPE OF THE FILE -- STUDENT
export const getAllFiles=async(req,res,next)=>{
    const studentId=req.student._id;
    const {classId}=req.params;
    const {search,type}=req.query;

    const student=await Student.findById(studentId);
    const isStudent=student.classesIn.filter(c=>String(c)===String(classId));
    console.log(isStudent)
    if(!isStudent.length){
        res.status(403).json({
            success:false,
            message:"Student in not in this Class. So cannot give you the files."
        })
    }

    const tempClass=await Class.findById(classId).populate('files').exec();

    let outputFiles=tempClass.files;
    if(search){
        outputFiles=tempClass.files.filter(file=>file.name===search.slice(1,-1));
    }
    if(type){
        outputFiles=outputFiles.filter(file=>file.fileType===type.slice(1,-1))
    }



    res.status(200).json({
        success:true,
        message:"Files for Student",
       files:tempClass.files
    })
}