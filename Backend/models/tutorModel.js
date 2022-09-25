import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken'

const tutorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validator:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[8,'Password should be atleast 8 characters'],
        select:false
    },
    classCreated:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Class',
            required:true
        }
    ],
    students:[
        {
            student:{
                type:mongoose.Schema.ObjectId,
                ref:'Student',
                required:true
            }
        }
    ]
})
// tutorSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
    
//     this.password=await bcrypt.hash(this.password,10);
// })

tutorSchema.methods.comparePassword=async function(enteredPassword){
    console.log(enteredPassword)
    const check=this.password===enteredPassword?true:false;
    console.log(check)
    return check;
}


tutorSchema.methods.generateJWT = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

const Tutor=mongoose.model("tutor",tutorSchema);

export default Tutor;