import app from './app.js'
import ConnectDatabase from './database/db.js'
import dotenv from 'dotenv';


dotenv.config({path:'backend/config/config.env'});
ConnectDatabase();

app.listen(3000,(req,res)=>{
    console.log("Listening on port 3000");
})