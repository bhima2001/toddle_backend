import mongoose from 'mongoose';
const ConnectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Connected to MongoDB`);
    });
}

export default ConnectDatabase;