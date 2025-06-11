import express from 'express'
import { connect } from './connect.js'
import UserRouter from './routes/user.route.js'

const app=express()

app.use(express.json())
connect();
app.use('/api/user',UserRouter)

app.listen(5000,()=>console.log('server started'))