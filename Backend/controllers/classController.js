import Class from '../models/classModel'
import Tutor from '../models/tutorModel'
import Student from '../models/studentModel'




//CREATING A NEW CLASS -- TUTOR
export const createAClass=async(req,res,next)=>{
    const tutorId=req.tutor._id;
    const newClass=await Class.create({
        createdBy:tutorId
    })

    const tutor=await Tutor.findById(tutorId);
    console.log("id",newClass._id)
    tutor.classCreated.push(newClass._id);
    await tutor.save({validateBeforeSave:false});

    res.status(201).json({
        success:true,
        message: 'Class created successfully',
        newClass
    })

}



//ADDING STUDENT TO A CLASS -- TUTOR
export const addToClass=async(req,res,next)=>{
    const {studentId,classId}=req.body;
    console.log(classId)
    const tutorId=req.tutor._id;
    
    const findClass=await Class.findById(classId);
    console.log(findClass)

    if(String(findClass.createdBy)!=String(tutorId)){
        return res.status(404).json({
            success:false,
            message:"This is not your class. So you cannot add students."
        })
    }
    const findStudent=await Student.findById(studentId);
    if(!findStudent){
        return res.status(404).json({
            success:false,
            message:'Student with the given id does not exist.'
        })
    }

    if(findStudent.classesIn.includes(classId)){
        return res.status(409).json({
            success:false,
            message:"Student is already in this class"
        })
    }
    findStudent.classesIn.push(classId);

    await findStudent.save({validateBeforeSave:false});
    

    res.status(201).json({
        success:true,
        message:'Student is successfully added to the class.'
    })
}



//REMOVING A STUDENT FROM A CLASS -- TUTOR

export const deleteStudent=async(req,res,next)=>{
    const {studentId,classId}=req.params;
    
    const student=await Student.findById(studentId);
    console.log(student, tempClass);
    if(!student){
        return res.status(404).json({
            success:false,
            message:"Student does not exist",
        })
    }
    if(!tempClass){
        return res.status(404).json({
            success:false,
            message:"Class does Not exist",
        })
    }

    student.classesIn.forEach(c=>console.log(c));
    const removeClass=student.classesIn.filter(c=>String(c)!==String(classId));


    await Student.findByIdAndUpdate(studentId,{
        classesIn:removeClass,
    },{
        new:true,
        runValidator:true,
        useFindAndModify:false 
    })



    res.status(200).json({
        success:true,
        message:"Deleted from class"
    })

}


//ALL FILES IN A CLASS -- TUTOR,STUDENT
export const classFiles=async(req,res,next)=>{
    const {classId}=req.params;
    const {search,type} = req.query;
    console.log(search)
    const tempClass= await Class.findById(classId).populate('files').exec()
    let requiredFiles=tempClass;
    if(search){
        requiredFiles=await tempClass.files.filter(file=>{
            return search.slice(1,-1)===file.name;
        })
    }
    res.status(200).json({
        success:true,
        message:"Files of this class are",
        Files:requiredFiles
    })
    
}

