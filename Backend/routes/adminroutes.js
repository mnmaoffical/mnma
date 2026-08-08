import express from "express"
import user from "../models/user.js"
import { protect, admin } from "../middleware/authmiddleware.js"
const adminrouter = express.Router()

adminrouter.get("/" , protect , admin , async(req , res)=>{   // getting all users (admin only)
    try {
       const gettinguser = await user.find({}).select("-password");
        res.json(gettinguser)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})

adminrouter.post("/" , protect , admin , async(req , res)=>{   // adding a new user 
   const {name , email , password , role} = req.body
    try {
        let specificadmin  = await user.findOne({email})
        if(specificadmin){
            return res.status(400).json({message:"User already exists"})
        }
        specificadmin = new user({
            name , email  , password , role: role|| "customer"
        })
        await specificadmin.save()
        res.status(201).json({message:"User created successfully" , specificadmin}  )
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})



adminrouter.put("/:id" , protect , admin , async(req , res)=>{
    try {
         const {id} = req.params
        let updatingadmin =  await user.findById(id)
        if(updatingadmin){
            updatingadmin.name = req.body.name || updatingadmin.name
            updatingadmin.email = req.body.email || updatingadmin.email
            updatingadmin.role= req.body.role || updatingadmin.role
        }
    const justtry =  await updatingadmin.save()
res.json({message:"user updated successfully" , user:justtry})

    } catch (error) {
         console.error(error)
        res.status(500).json({message:"Server error"})
    }
})


adminrouter.delete("/:id", protect , admin , async(req,res)=>{
    try {
        const deletinguser = await user.findById(req.params.id)
        if(deletinguser){
            await deletinguser.deleteOne()
            res.json({message:"user deleted successfully"})
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    } catch (error) {
          console.error(error)
        res.status(500).json({message:"Server error"})
    }
} )
export default adminrouter