import express from "express"
const subrouter = express.Router()
import subscriber from "../models/subscriber.js"

subrouter.post("/subscribe" , async(req,res)=>{
const {email} = req.body
if(!email){
    return res.status(400).json({message:"Email is required"})
}

try{
let findingsus = await subscriber.findOne({email})
if(findingsus){
    return res.status(400).json({message:"email is already subscribed"})
}
findingsus = new subscriber({email})
await findingsus.save()
 return res.status(201).json({message:"Successfully subscribed to the newsletter"})
}
catch(error){
console.error(error)
res.status(500).json({message:"server error"})
}
})

export default subrouter

