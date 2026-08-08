import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectdb from "./Config/db.js"
import authroute from "./routes/userroutes.js"
import productroute from "./routes/productroutes.js"
import cartroute from "./routes/cartroutes.js"
import { uploadroute } from "./routes/uploadroutes.js"
import checkoutroute from "./routes/checkoutroutes.js"
import orderroute from "./routes/orderroutes.js"
import subrouter from "./routes/subscriberroute.js"
import adminrouter from "./routes/adminroutes.js"
import adminprorouter from "./routes/adminproductroutes.js"
import adminorder from "./routes/adminorderroute.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;
connectdb()

app.use("/api/user", authroute)
app.use("/api/products", productroute)
app.use("/api/cart", cartroute)
app.use("/api/upload" ,uploadroute )
app.use("/api/checkout", checkoutroute)
app.use("/api/orders", orderroute)
app.use("/api/" , subrouter)
app.use("/api/admin/users" , adminrouter)
app.use("/api/admin/product" , adminprorouter)
app.use("/api/admin/order" , adminorder)
app.get("/", (req, res) => {
    res.send("WELCOME")
})

app.listen(port, () => {
    console.log(`server at ${port} started`)
})

