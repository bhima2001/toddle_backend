import mongoose from 'mongoose';

const classSchema=new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'Tutor',
        required:true,
    },
    files:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'File',
            required:true
        }
    ]
})

const Class=mongoose.model('Class',classSchema);

export default Class;