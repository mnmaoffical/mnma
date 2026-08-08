import express from "express";
import cart from "../models/cart.js";
import Product from "../models/product.js";   // renamed to avoid collision
import { protect } from "../middleware/authmiddleware.js";
import productmodel from "../models/product.js";

const cartroute = express.Router();



// ─────────────────────────────────────────────
// HELPER – getCart
// Finds or creates the cart for a user / guest
// ─────────────────────────────────────────────
const getCart = async (userId, guestId) => {

    if (userId) {
        let existingCart = await cart.findOne({ user: userId });
        if (existingCart) return existingCart;

    }

    if (guestId) {
        let existingCart = await cart.findOne({ guestId });   // field is now "guestId" in schema
        if (existingCart) return existingCart;

    }

    return null;
};

// ─────────────────────────────────────────────
// HELPER – recalcTotal
// ─────────────────────────────────────────────
const recalcTotal = (products) => {
    let sum = 0;

    for (const item of products) {
        const price = parseFloat(item.price) || 0;
        sum += price * item.quantity;
    }

    return sum;
};


// ─────────────────────────────────────────────
// POST /api/cart
// Add item to cart (guest & logged-in)
// Body: { productid, quantity?, size, color, guestId? }
//   guestId is optional – auto-generated if missing
// ─────────────────────────────────────────────
cartroute.post("/", async (req, res) => {   // customer adding a product to card 
    const { productid, quantity, size, color, guestId, userId } = req.body;


    if (!productid) {
        return res.status(400).json({ message: "productid is required" });
    }

    try {
        const product = await productmodel.findById(productid);  // is this product available 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingCart = await getCart(userId, guestId);  // getting the existing cart of that user 

        // Check if same product + size + color already in cart
        if (existingCart) {
            if (userId && !existingCart.user) {
                existingCart.user = userId;
            }
            const itemIndex = existingCart.products.findIndex(
                (p) =>
                    p.productid.toString() === productid.toString() &&  // MongoDB IDs are ObjectIds so converted to string 
                    p.size === size &&
                    p.color === color
            );

            if (itemIndex > -1) {
                // Already in cart – bump quantity
                existingCart.products[itemIndex].quantity += quantity;
            } else {
                existingCart.products.push({
                    productid,
                    name: product.name,
                    image: product.images[0].url || "",
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            existingCart.totalprice = recalcTotal(existingCart.products);
            await existingCart.save();

            res.status(201).json(existingCart);
        } else {
            //Create a new cart
            const newCart = await cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "Guest_" + new Date().getTime(),
                products: [
                    {
                        productid,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity


                    },
                ],
                totalprice: product.price * quantity

            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ─────────────────────────────────────────────
// GET /api/cart
// Get cart — logged-in: Authorization header
//           guest:     pass guestId as query param
// ─────────────────────────────────────────────
cartroute.get("/", async (req, res) => {
    const { userId, guestId } = req.query
    //console.log(guestId)
    //console.log(userId)
    //  if (!userId && !guestId) {
    //      return res.status(400).json({ message: "Either guest ID is missing or usreID id" });
    //  }

    try {
        const existingCart = await getCart(userId, guestId);
        if (existingCart) {
            if (userId && !existingCart.user) {
                existingCart.user = userId;
                await existingCart.save();
            }
            res.json(existingCart);
        } else {
            res.json({ products: [], totalprice: 0 });
        }

    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({ message: "Server error" });
    }
});

// ─────────────────────────────────────────────
// PUT /api/cart
// Update item quantity
// Body: { productid, quantity, size, color, guestId? }
// ─────────────────────────────────────────────
cartroute.put("/", async (req, res) => {
    const { productid, quantity, size, color, userId, guestId } = req.body;

    if (!productid || quantity === undefined) {
        return res.status(400).json({ message: "productid and quantity are required" });
    }
    if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    try {
        const existingCart = await getCart(userId, guestId);
        if (!existingCart) return res.status(404).json({ message: "Cart not found" })

        if (userId && !existingCart.user) {
            existingCart.user = userId;
        }

        const itemIndex = existingCart.products.findIndex(
            (p) =>
                p.productid.toString() === productid.toString() &&
                p.size === size &&
                p.color === color
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        } else {
            if (quantity > 0) {
                existingCart.products[itemIndex].quantity = quantity;  // directly updating what frontend is sending 
            } else {
                existingCart.products.splice(itemIndex, 1); //remove prd if quantity is 0
            }
            existingCart.totalprice = recalcTotal(existingCart.products);
            await existingCart.save();
            return res.status(200).json(existingCart);
        }
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ─────────────────────────────────────────────
// DELETE /api/cart
// Remove one item from cart
// Body: { productid, size, color, guestId? }
// ─────────────────────────────────────────────
cartroute.delete("/", async (req, res) => {
    const { userId, productid, size, color, guestId } = req.body;

    if (!productid) {
        return res.status(400).json({ message: "productid is required" });
    }

    try {
        const existingCart = await getCart(userId, guestId);
        if (!existingCart) return res.status(404).json({ message: "cart not found" });

        if (userId && !existingCart.user) {
            existingCart.user = userId;
        }

        const initialLength = existingCart.products.length;  // how many products were there 
        existingCart.products = existingCart.products.filter(  // keep all product except the one we want to delete 
            (p) =>
                !(
                    p.productid.toString() === productid.toString() &&
                    p.size === size &&
                    p.color === color
                )
        );

        if (existingCart.products.length === initialLength) {  // if after filtering the no of pro is same as before fil means no deleting prd found
            return res.status(404).json({ message: "Item not found in cart" });
        }

        existingCart.totalprice = recalcTotal(existingCart.products);
        await existingCart.save();

        res.json(existingCart);
    } catch (error) {
        console.error("Remove item error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ─────────────────────────────────────────────
// POST /api/cart/merge
// Merges guest cart → user cart on login
// Auth: required  |  Body: { guestId }
// ─────────────────────────────────────────────
cartroute.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;


    if (!guestId) {
        return res.status(400).json({ message: "guestId is required" });
    }

    try {
        const guestCart = await cart.findOne({ guestId });   // uses updated schema field
        const userCart = await cart.findOne({ user: req.user._id });
        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.json({ message: "No guest cart to merge or its empty", cart: userCart });
            }
            if (userCart) {

                guestCart.products.forEach((guestItem) => {
                    const itemIndex = userCart.products.findIndex(
                        (p) =>
                            p.productid.toString() === guestItem.productid.toString() &&
                            p.size === guestItem.size &&
                            p.color === guestItem.color
                    );
                    if (itemIndex > -1) {
                        //If item exist in the cart update the quantity
                        userCart.products[itemIndex].quantity += guestItem.quantity;
                    } 
                    else {
                        userCart.products.push(guestItem); // else push the guestcart item to usercart
                    }
                });
                userCart.totalprice = recalcTotal(userCart.products);
                await userCart.save();
                try {
                    await cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error("Error deleting guest cart:", error);

                }
                res.status(200).json(userCart);
            } else {
                //if user has no existing cart , assign the guest cart to the user
                guestCart.user = req.user._id;  // userid which was ND earlier is not defined 
                guestCart.guestId = undefined;  // and now changing guestid to ND 
                await guestCart.save();
                res.status(200).json(guestCart)
            }

        } else {
            if (userCart) {
                //Guest cart has already been merged return user cart
                return res.status(200).json(userCart)
            }

            res.status(404).json({ message: "Guest cart not found" });
        }
    }
    catch (error) {
        console.error("Merge cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default cartroute;
