import express from "express";
import "dotenv/config"
import cors from "cors";
import  connectDB  from "./configs/db.js";
import adminRouter from "./Routes/Admin.route.js"
import blogRouter from "./Routes/Blog.route.js";

const app = express();
await connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.get("/" , (req,res) => res.send("API is working"));
app.use("/api/admin",adminRouter);
app.use("/api/blog",blogRouter);

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
    
})


export default app