import mongoose from "mongoose"

const connectdb  =  async()=>{
    try{
   await mongoose.connect(process.env.MONGOURL)
   console.log("MONGODB CONNECTED SUCCESSFULLY")
    }
    catch(error){
 console.log("Mongodb conection failed " , error)
 process.exit(1)
    }
}
export default connectdb