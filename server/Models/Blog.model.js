import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Blog = mongoose.model("Blog" , BlogSchema);