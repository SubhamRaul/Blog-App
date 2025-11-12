import express from "express"
import auth from "../Middleware/Auth.middleware.js"
import { 
    adminLogin,
    ApproveCommentById,
    deleteCommentById,
    getAllBlogsAdmin,
    getAllComments,
    getDashBoard
 } from "../Controllers/Admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin);
adminRouter.get("/comments" , auth , getAllComments);
adminRouter.get("/blogs" , auth , getAllBlogsAdmin);
adminRouter.post("/delete-comment" , auth , deleteCommentById);
adminRouter.post("/approve-comment" , auth , ApproveCommentById);
adminRouter.get("/dashboard" , auth , getDashBoard);


export default adminRouter;