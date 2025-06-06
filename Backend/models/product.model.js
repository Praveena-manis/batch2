import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    imageUrl:{type:String,
        required:true
    }
},{timestamps:true});
export default mongoose.model('Product',productSchema);