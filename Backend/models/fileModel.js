import mongoose from 'mongoose'


const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    url:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'Tutor',
    }
})

const File = mongoose.model('File',fileSchema);

export default File;