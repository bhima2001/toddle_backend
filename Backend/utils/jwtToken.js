const sendToken=(user,statusCode,res,msg)=>{
    const token=user.generateJWT();

    const options={
        expires:new Date(Date.now()+(24*60*60*1000)),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        message:msg,
        user,
        token
    })
}

export default sendToken;