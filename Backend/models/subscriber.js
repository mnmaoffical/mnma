
import mongoose from "mongoose"

const subscriberschema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true , 
        lowercase:true
    },
    subscribedat:{
        type:Date,
        default: Date.now
    }
})

const subscriber = mongoose.model("subscriber" , subscriberschema)
export default subscriber