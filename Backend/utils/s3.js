// import S3 from 'aws-sdk/clients/s3'
// import fs from 'fs'

// const bucketName=process.env.S3_BUCKET_NAME;
// const region=process.env.S3_BUCKET_LOCCATION;
// const accessKey=process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey=process.env.AWS_SECRET_KEY;


// const s3=new S3({
//     region,
//     accessKey,
//     secretAccessKey
// })


// export const uploadFile=(file)=>{
//     const fileStream=fs.createReadStream(file.path);

//     const uploadParams={
//         Bucket: bucketName,
//         Body:fileStream,
//         Key:file.name
//     }
//     return s3.upload(uploadParams).promise()
// }

// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// import aws from 'aws-sdk'
// import multer from 'multer'
// import multerS3 from 'multer-s3'

// const s3 = new aws.S3();

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.S3_BUCKET_LOCATION,
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };

// export const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     acl: "public-read",
//     s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: "TESTING_METADATA" });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

