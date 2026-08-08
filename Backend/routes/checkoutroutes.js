import express from "express";
import Checkout from "../models/checkout.js";
import Order from "../models/order.js";
import cart from "../models/cart.js";
import { protect } from "../middleware/authmiddleware.js";

const checkoutroute = express.Router();

// POST /api/checkout
// Create checkout
checkoutroute.post("/", protect, async (req, res) => {
    try {
        const { checkoutItems, shippingAddress, paymentMode, totalPrice } = req.body;

        if (!checkoutItems || checkoutItems.length === 0) {
            return res.status(400).json({ message: "No checkout items" });
        }

        const checkout = new Checkout({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMode,
            totalPrice
        });

        const createdCheckout = await checkout.save();
        res.status(201).json(createdCheckout);
    } catch (error) {
        console.error("Create checkout error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/checkout/:id/pay
// Update checkout to mark paid after sucessful payment
checkoutroute.put("/:id/pay", protect, async (req, res) => {
    try {
        const { paymentStatus, paymentDetails } = req.body;
        const checkout = await Checkout.findById(req.params.id);  //route params grabbing checkoutId
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        // Check if user owns this checkout
        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (paymentStatus) {
            checkout.paymentStatus = paymentStatus;
        }
        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paidAt = Date.now();
        }
        if (paymentDetails) {
            checkout.paymentDetails = paymentDetails;
        }

        const updatedCheckout = await checkout.save();
        res.json(updatedCheckout);
    } catch (error) {
        console.error("Pay checkout error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/checkout/:id/finalise
// Finalise checkout to create order and delete cart
checkoutroute.post("/:id/finalise", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id); //id : checkoutid

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (checkout.isPaid && !checkout.isFinalised) {
            // Create final order
            const order = new Order({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMode: checkout.paymentMode,
                totalPrice: checkout.totalPrice,
                isPaid: checkout.isPaid,
                paidAt: checkout.paidAt,
                paymentStatus: checkout.paymentStatus,
                paymentDetails: checkout.paymentDetails,
                isDelivered: false,
                status: "Processing",
                isFinalised: true,
                finalisedAt: Date.now()
            });
            //save to  the db 
            const createdOrder = await order.save();

            // Mark checkout as finalised in the db
            checkout.isFinalised = true;
            checkout.finalisedAt = Date.now();
            await checkout.save();

            // Delete user cart
            await cart.findOneAndDelete({ user: req.user._id });

            res.status(201).json({ message: "Order finalised successfully and cart deleted ", order: createdOrder });
        } else {
            res.status(400).json({ message: "Checkout is either not paid or already finalised" });
        }
    } catch (error) {
        console.error("Finalise checkout error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default checkoutroute;
