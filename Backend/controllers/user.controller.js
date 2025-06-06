import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';
import productModel from '../models/product.model.js';

export const register=async(req,res)=>{
    try {
        const {name,email,username,password}=req.body;
        if(!name||!email||!username||!password)
            return res.status(406).send({messsage:'All Fields are mandatory'})
        let user=await UserModel.findOne({email})
        if(user)
            return res.status(406).send({message:'EmailId is already registered'})
        user=await UserModel.findOne({username})
        if(user)
            return res.status(406).send({message:'Username is already taken by someone'})
        const hashPassword=await bcrypt.hash(password,12);
        const newUser=new UserModel({name,email,username,password:hashPassword})
        const resp=await newUser.save()
        return res.status(201).send({message:"User Registered Successfully",userId:resp})
    } catch (error) {
        return res.status(500).send({message:"Some error occurred",error})
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password)
            return res.status(406).send({message:'All fields are mandatory'})
        let user=await UserModel.findOne({email});
        if(!user)
            return res.status(403).send({message:'THis email id is not  registered'})

        if(await bcrypt.compare(password,user.password)){
            //create token
            const token=jwt.sign({id:user._id,username:user.username},"1234567890abcdefgh")
            return res.status(200).send({message:'User logged In successfully',token})
        }
        else
        return res.status(401).send({messsage:"Invalid Credentials"}) 
     }catch (error) {
        return res.status(500).send({message:'Some error occurred',error})
    }
}
export const getUserprofile=async(req,res)=>{
    try {
        const user=await UserModel.findOne({_id:req.user.id})
        if(user)
            return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({message:'Some error occurred',error})
    }
}
export const getAllUsers=async(req,res)=>{
    try {
        const user=await UserModel.find().select('-password');//exclude password field
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({message:'Some error occurred',error})
    }
}
export const deleteUserById=async(req,res)=>{
    try {
        const id=typeof req.id=='object'? req.id.id:req.id//coming from middleware
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message:"Invalid user ID"})
        }
        const resp=await UserModel.findByIdAndDelete(id);
        return res.status(200).send({message:'User Deleted'})
    } catch (error) {
        return res.status(500).send({message:'Some error occurred',error})
    }
}
export const imageUpload=async(req,res)=>{
    try {
        if(!req.file)
            return res.status(400).send({error:'No file uploaded'});
        const id=req.user.id;
        await UserModel.findByIdAndUpdate(id,{profile:'/images/${req.file.filename'})
        res.send({
            message:'image uploaded successfully',
            filename:req.file.filename
        })
    } catch (error) {
        return res.status(500).send({message:'Some error occurred',error})
    }
}
export const addProduct=async(req,res)=>{
    const {title,description,price,quantity}=req.body;
    if(!req.file)
        return res.status(400).json({message:"Image is required"});
    const imageUrl=`http://localhost:5000/uploads/${req.file.filename}`;
    try {
        const product=new productModel({title,description,price,quantity,imageUrl});
        await product.save();
        res.status(201).json({message:'Product Created',product});

    } catch (error) {
        res.status(500).send({message:'Error occurred',error})
    }
}