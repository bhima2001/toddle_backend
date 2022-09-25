import express from 'express'
const app=express();
import cookieParser from 'cookie-parser'
import tutor from './routes/tutorRoutes.js'
import student from './routes/studentRoutes';
import Class from './routes/classRoutes';
import File from './routes/fileRoutes'





app.use(cookieParser())
app.use(express.json())
app.use('/api/v1',tutor);
app.use('/api/v1',student);
app.use('/api/v1',Class);
app.use('/api/v1',File);




export default app;