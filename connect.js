import mongoose from 'mongoose'

export const connect=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/batch2');
        console.log('Connected...');
    } catch (error) {
        console.log('Error while connecting DB');  
    }
}