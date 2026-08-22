import express from "express";
import Order from "../models/order.js";
import { protect } from "../middleware/authmiddleware.js";

const orderroute = express.Router();

// GET /api/orders/my-orders
// Get logged in user orders
orderroute.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get order by ID
orderroute.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if user owns this order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.json(order);
    } catch (error) {
        console.error("Get order by ID error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default orderroute;
