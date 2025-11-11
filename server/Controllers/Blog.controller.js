import {Blog} from "../Models/Blog.model.js"
import fs from "fs"
import ImageKit from "@imagekit/nodejs";


const client = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

const addBlog = async (req,res)=>{
    try {
        const {title , subtitle , description , category , isPublished} = req.body;
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success:false , message:"Missing req. fields"});
        }

        const fileBuffer = fs.createReadStream(imageFile.path);

        // upload in Imagekt
        const response = await client.files.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder: "/blogImages"
        })

        // optimization through imagekit url
        const url = client.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
            src:response.filePath,
            transformation:[
                {quality : "auto"},
                {format: "webp"},
                {width:"1280"}
            ]
        });

        const image = url;

        await Blog.create({title,subtitle,description,category,image,isPublished});

        return res.status(200).json({success:true , message:"Blog added succesfully"});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false , message:error.message})
    }
}

const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({isPublished:true});
        return res.status(200).json({success:true , message:"Blogs fetched successfully" , blogs:blogs});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
}

const getBlogById = async (req,res) => {
    try {
        const {BlogId} = req.params;
        const blog = await Blog.findById(BlogId);
        if(!blog){
            return res.status(400).json({success:true , message:"Blog not found"});
        }
        res.status(200).json({success : true , message:"Blog fetched successfully" , blog});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
}

const deleteBlogById = async (req,res) => {
    try {
        const {BlogId} = req.body;
        await Blog.findByIdAndDelete(BlogId);
        res.json({success : true , message:"Blog deleted successfully"});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
}

const toggolePublish = async (req,res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        return res.status(500).json({success:false , message:"Blog updated Succcessfully."});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});    
    }
}

// TODO : blog update controller




export {
    addBlog,
    getAllBlogs,
    getBlogById,
    deleteBlogById,
    toggolePublish
}