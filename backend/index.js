import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "node:path";
import fs from "fs";


const app = express() ;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function(req,file,cb){
       // console.log(file)
        cb(null,path.basename(file.originalname,path.extname(file.originalname))+"-"+uuid()+path.extname(file.originalname));
    }
})

//multer configuration
const upload = multer({
    storage:storage,
})

app.use(cors(
    {
        origin:"*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));

app.get("/",(req,res)=>{
    res.send("Hello from the server") ;
})

app.post("/upload",upload.single('file'),(req,res)=>{
   
    const id = uuid();

    
})

app.listen(8000,()=>{
    console.log("Server is running on port 8000") ;
})
