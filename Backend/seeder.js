import mongoose from "mongoose"
import dotenv from "dotenv"
import products from "./data/productsdetail.js"
import product from "./models/product.js"
import user from "./models/user.js"
dotenv.config()
mongoose.connect(process.env.MONGOURL)


const seeddata = async () => {
   try {
      await product.deleteMany()   // removed all existing product 
      await user.deleteMany()  // removed all existing users
      await cart.deleteMany()  // removed all existing carts

      const createduser = await user.create({  // created one user by default
         name: "Admin user",
         email: "admin@text.com",
         password: "123456",
         role: "admin"
      })

      // giving user id  of the user created by us ---  to products
      const userid = createduser._id

      const sampleproducts = products.map((product) => {
         return { ...product, user: userid }    // keep other properies as it is and adding userid in each product
      })

      await product.insertMany(sampleproducts)    // now these products are added to the database ... 
      console.log("Product seeded successfully")
      process.exit()


   } catch (error) {
      console.log("error seeding the data", error)
      process.exit(1)
   }
}
seeddata();