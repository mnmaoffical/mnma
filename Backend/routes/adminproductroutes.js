import express from "express"
import product from "../models/product.js"
import { protect, admin } from "../middleware/authmiddleware.js"

const adminprorouter = express.Router()

// GET /api/admin/product - fetch all products
adminprorouter.get("/", protect, admin, async (req, res) => {
    try {
        const gettingpro = await product.find({})
        res.json(gettingpro)
        console.log(gettingpro)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
})

adminprorouter.post("/", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountprice, countinstock, category, brand, sizes, colors, collections, material, gender,
            images, isfeatured, ispublised, tags, dimensions, weight, sku } = req.body

        // ✅ Convert numbers properly
        const creatingproduct = new product({
            name,
            description,
            price: Number(price),
            discountprice: Number(discountprice) || 0,
            countinstock: Number(countinstock),
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isfeatured,
            ispublised,
            tags,
            dimensions,
            weight: Number(weight) || 0,
            sku,
            user: req.user._id  //  This comes from protect middleware
        })

        console.log("Creating product:", creatingproduct)  

        const newproduct = await creatingproduct.save()
        res.status(201).json(newproduct)
    } catch (error) {
        console.error("POST error:", error)  
        res.status(500).json({ message: error.message })  
    }
})

// PUT /api/admin/product/:id - update product
adminprorouter.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name, description, price, discountprice, countinstock, category,
            brand, sizes, colors, collections, material, gender, images, isfeatured, ispublised, tags, dimensions, weight, sku
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

// DELETE /api/admin/product/:id - delete product
adminprorouter.delete("/:id", protect, admin, async (req, res) => {
    try {
        const deletingproduct = await product.findById(req.params.id)
        if (deletingproduct) {
            await deletingproduct.deleteOne()
            res.json({ message: "Product removed" })
        } else {
            return res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default adminprorouter