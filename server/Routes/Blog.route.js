import express from "express";
import { 
    addBlog,
    addComment,
    deleteBlogById,
    getAllBlogs,
    getBlogById,
    getBlogComments,
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
blogRouter.post("/add-comment" , addComment);
blogRouter.post("/comments", getBlogComments);

export default blogRouter;