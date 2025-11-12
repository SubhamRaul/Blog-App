import jwt from "jsonwebtoken"
import { Blog } from "../Models/Blog.model.js";
import {Comment} from "../Models/Comment.model.js"

const adminLogin = async (req , res) => {
    try {
        const {email , password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false , message:"Invalid Credentials"});
        }
        const token = jwt.sign({email} , process.env.JWT_SECRET);
        res.success.json({success:true , token , message:"Admin Login successful"});
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

const getAllBlogsAdmin = async (req,res) => {
    try {
        const allBlogs = await Blog.find({}).sort({createdAt:-1});
        return res.success.json({success:true , allBlogs , message:"All blog fetching is successful"});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message})
    }
}

const getAllComments = async (req,res) => {
    try {
        const Comments = await Comment.find({}).populate("Blog").toSorted({createdAt:-1});
        return res.status(200).json({success:true , Comments , message:"All comment fetching is successful"})
    } catch (error) {
        return res.status(500).json({success:false , message:error.message})        
    }
}

const getDashBoard = async () =>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false});

        const dashBoardData = {
            blogs,comments,drafts,recentBlogs
        }
        return res.status(200).json({success:true , dashBoardData});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message}) 
    }
}

const deleteCommentById = async (req,res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({success:true , message:"comment deleted successfully"})
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
}

const ApproveCommentById = async (req,res) => {
    try {
        const {id} = req.body;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.isApproved = true;
        await comment.save();
        
        return res.status(200).json({success:true , message:"comment deleted successfully"})
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
}

export {
    adminLogin,
    getAllBlogsAdmin,
    getAllComments,
    getDashBoard,
    deleteCommentById,
    ApproveCommentById
}