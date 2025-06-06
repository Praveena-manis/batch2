import express from 'express'
import { connect } from './connect.js'
import UserRouter from './routes/user.route.js'
import cors from 'cors';

const app=express()

app.use(express.json())
app.use(cors());

connect();
app.use('/api/user',UserRouter)
app.use('/uploads', express.static('uploads'));

app.listen(5000,()=>console.log('server started'))