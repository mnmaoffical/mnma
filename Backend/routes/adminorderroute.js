import express from "express"
import Order from "../models/order.js"
import { protect, admin } from "../middleware/authmiddleware.js"
const adminorder = express.Router()

adminorder.get("/" , protect , admin , async(req , res)=>{
    try {
        const gettingorder = await Order.find({}).populate("user" , "name email")  // getting name and email also from user 
        // schema if we will not use populate then  only user id will be there 
        res.json(gettingorder)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})


adminorder.put("/:id" , protect , admin , async(req , res)=>{  // admin will get a particular product and update it 
    try {
        let updatingorder =  await Order.findById(req.params.id)
if(updatingorder){
    updatingorder.status = req.body.status || updatingorder.status
    updatingorder. isDelivered = req.body.status ==="Delivered" ? true : updatingorder.isDelivered
    updatingorder.deliveredAt =req.body.status ==="Delivered" ? Date.now() : updatingorder.deliveredAt

    const finallyupdated = await  updatingorder.save()
    res.json(finallyupdated)
}
else{
     res.status(404).json({message:"order not found"})
}
    }
     catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
} )

adminorder.delete("/:id" , protect , admin , async(req , res)=>{
    try {
      let deletingorder = await Order.findById(req.params.id)
      if(deletingorder){
        await deletingorder.deleteOne()
        res.json({message:"Order removed"})
      }
      else{
        res.json({message:"Order not found"})
      }  
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})


export default adminorder