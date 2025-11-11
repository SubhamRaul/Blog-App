import express from "express";
import { 
    addBlog,
    deleteBlogById,
    getAllBlogs,
    getBlogById,
    toggolePublish,
} from "../Controllers/Blog.controller.js";
import upload from "../Middleware/Multer.middleware.js"
import auth from "../Middleware/Auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/add" , upload.single("image") , auth , addBlog);
blogRouter.get("/all" , getAllBlogs);
blogRouter.get("/:BlogId" , getBlogById);
blogRouter.post("/delete" , auth , deleteBlogById);
blogRouter.post("/toggole-publish" , auth , toggolePublish);

export default blogRouter;