import File from '../models/fileModel.js'
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import Class from '../models/classModel.js'



//UPLOAD A FILE TO A CLASS OF ANY TYPE -- TUTOR
export const uploadFile=async(req,res)=>{
  const {classId}=req.params;
  console.log(typeof req.body.file)
  if(req.body.fileType==='url'){
    const {name,description,file,fileType}=req.body;
    const fileURL=await File.create({
      name,
      description,
      url:file,
      fileType,
      createdBy: req.tutor._id,
    }).then(async(fileURL)=>{ 
      const tempClass=await Class.findById(classId);
      tempClass.files.push(fileURL);
      await tempClass.save();
    })

    return res.status(200).json({
      success:true,
      message:"Url uploaded successfully.",
      fileURL
    })

  }else{
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.S3_BUCKET_LOCATION
    });
    const s3 = new aws.S3();
    var params = {
      ACL:'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `file/`+req.body.name+Date.now()+path.extname(req.file.originalname)
    };

    s3.upload(params, async(err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }
      
      if (data) {
        fs.unlinkSync(req.file.path); 
        const locationUrl = data.Location;
        let newFile = new File({ ...req.body, url: locationUrl,createdBy: req.tutor._id});
        console.log(newFile);
        await newFile.save().then(async(file) => {
          const tempClass=await Class.findById(classId);
          tempClass.files.push(newFile._id)
          await tempClass.save({validateBeforeSave:false});
          res.json({ message: 'File created successfully', file });
        })
        .catch(err => {
          console.log('Error occured while trying to save to DB',err);
        });
      }
    });
  }
  }



  //DELETE A FILE -- TUTOR
  export const deleteFile=async(req,res,next)=>{
    const {fileId} = req.params.fileId;
    const tutorId=req.tutor._id;

    const file=await File.findById(fileId);

    if(String(file.createdBy)!==String(tutorId)){
      return res.status(404).json({
        success:false,
        message:"This tutor didnot upload this file",
      })
    }

    await file.delete();

    res.status(200).json({
      success:true,
      message:"successfully deleted file",
    })
  }