import express from "express"
import product from "../models/product.js"
import { protect, admin } from "../middleware/authmiddleware.js"
const productroute = express.Router();

//Post a product , only for admin
productroute.post("/", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountprice, countinstock, category, brand, sizes, colors, collections, material, gender,
            images, isfeatured, ispublised, tags, dimensions, weight, sku } = req.body

        const user = req.user._id;
        console.log(user)

        const creatingproduct = new product({
            name, description, price, discountprice, countinstock, category, brand, sizes, colors, collections, material, gender,
            images, isfeatured, ispublised, tags, dimensions, weight, sku, user
        })
        console.log(creatingproduct)

        const newproduct = await creatingproduct.save();
        res.status(201).json(newproduct)

    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})

//Update a product
productroute.put("/:id", protect, admin, async (req, res) => {

    try {

        const {
            name, description, price, discountprice, countinstock, category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender, images, isfeatured, ispublised, tags, dimensions, weight, sku
        } = req.body

        const findingproduct = await product.findById(req.params.id)

        if (findingproduct) {

            findingproduct.name = name || findingproduct.name
            findingproduct.description = description || findingproduct.description
            findingproduct.price = price || findingproduct.price
            findingproduct.discountprice = discountprice || findingproduct.discountprice
            findingproduct.countinstock = countinstock || findingproduct.countinstock
            findingproduct.category = category || findingproduct.category
            findingproduct.brand = brand || findingproduct.brand
            findingproduct.sizes = sizes || findingproduct.sizes
            findingproduct.colors = colors || findingproduct.colors
            findingproduct.collections = collections || findingproduct.collections
            findingproduct.material = material || findingproduct.material
            findingproduct.gender = gender || findingproduct.gender
            findingproduct.images = images || findingproduct.images
            findingproduct.isfeatured = isfeatured !== undefined ? isfeatured : findingproduct.isfeatured
            findingproduct.ispublised = ispublised !== undefined ? ispublised : findingproduct.ispublised
            findingproduct.tags = tags || findingproduct.tags
            findingproduct.dimensions = dimensions || findingproduct.dimensions
            findingproduct.weight = weight || findingproduct.weight
            findingproduct.sku = sku || findingproduct.sku

            const updatedproduct = await findingproduct.save()

            res.json(updatedproduct)

        } else {

            return res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
})

//Delecte a product
productroute.delete("/:id", protect, admin, async (req, res) => {
    try {
        const deletingproduct = await product.findById(req.params.id)
        if (deletingproduct) {
            await deletingproduct.deleteOne();
            res.json({ message: "Product removed" })
        }
        else {
            return res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// get /api/products 
// get all products  with optional query filters 

productroute.get("/", async (req, res) => {  // collection - variable 
    // collections -- db 
    try {
        const { collection, size, color, gender, minprice, maxprice, sortby, search, category, material, brand, limit } = req.query
        let query = {}  // query is an object .. 

        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category
        }
        if (material) {
            query.material = { $in: material.split(",") }  // Multiple possible values → split() + $in  ,, query.material = {
            // $in: ["Cotton", "Wool", "Linen"]
        }
        if (brand) {
            query.brand = { $in: brand.split(",") }
        }
        if (size) {
            query.sizes = { $in: size.split(",") }
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender
        }


        if (minprice || maxprice) {
            query.price = {}
            if (minprice) {
                query.price.$gte = Number(minprice)
            }
            if (maxprice) {
                query.price.$lte = Number(maxprice)
            }
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },  // i - case insensitive 
                { description: { $regex: search, $options: "i" } }
            ]
        }
        let sort = {}
        if (sortby) {
            switch (sortby) {
                case "priceAsc":
                    sort = { price: 1 }
                    break;
                case "priceDesc":
                    sort = { price: -1 }
                    break;
                case "popularity":
                    sort = { rating: -1 }
                    break;
                default: break
            }
        }

        let products = await product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    }

    catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})


//On the basis of rating
productroute.get("/best-seller", async (req, res) => {
    try {
        const bestseller = await product.findOne().sort({ rating: -1 })
        if (bestseller) {
            res.json(bestseller)
        }
        else {
            res.status(404).json({ message: " no best seller  found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

//On the basis of time
productroute.get("/new-arrivals", async (req, res) => {
    try {
        const newarrival = await product.find().sort({ createdAt: -1 }).limit(8)
        if (newarrival) {
            res.json(newarrival)
        }
        else {
            res.status(404).json({ message: " no new arrival  found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})




//Get product by id
productroute.get("/:id", async (req, res) => {

    try {
        const productgot = await product.findById(req.params.id)
        if (productgot) {
            res.json(productgot)
        }
        else {
            res.status(404).json({ message: "Product not found" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})


//Get similar product => get product  of same gender and catergory
productroute.get("/similar/:id", async (req, res) => {

    const id = req.params.id
    try {
        const findingproduct = await product.findById(id)
        if (!findingproduct) {
            return res.status(404).json({ message: "product not found" })
        }
        const similarproduct = await product.find({
            _id: { $ne: id }, // exclude the current product id 
            gender: findingproduct.gender,
            category: findingproduct.category

        }).limit(4)
        res.json(similarproduct)
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: "server error" })
    }
});








export default productroute