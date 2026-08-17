import express from "express"
import multer from "multer"
import streamifier from "streamifier"
import { v2 as cloudinary } from "cloudinary";
 import dotenv from "dotenv"
 dotenv.config()
 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 })
const uploadroute = express.Router()
const storage = multer.memoryStorage()  // memorystorage - store file temperory , diskstorage - permanent 


const upload = multer({storage})

uploadroute.post("/", upload.array("images", 5), async (req, res) => {  // will accept a file named image 
    try {
        if (!req.file) { // store image info in req.file
            return res.status(400).json({ message: "No file uploaded" });
        }

        const streamupload = (filebuffer) => {  // filebuffer contain additional info  in the form of bytes 
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream( //  when you pipe bytes into it, those bytes are sent
                //  to Cloudinary and stored as an image, 
                  //  and when the upload finishes Cloudinary calls your callback with either an error or the uploaded image information.
                    (error, result) => {
                        if (result) {                     
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(filebuffer).pipe(stream);   // convert this buffer into multiple chunks 
            });
        };

        const result = await streamupload(req.file.buffer); // calling the function 

        res.json({
            imageurl: result.secure_url
        });

    } catch (error) {
        console.error(error);
            res.status(500).json({
        message: error.message,
        error
    });
    }
});

export {uploadroute}