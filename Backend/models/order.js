import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({  // schema of product ordered 
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({  // schema of order containing all products order+ payment + user id ... 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMode: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    paymentDetails: {
        transactionId: String,
        paymentGateway: String,
        amount: Number,
        currency: String
    },
    status: {
        type: String,
        default: "Processing"
    },
    isFinalised: {
        type: Boolean,
        default: false
    },
    finalisedAt: {
        type: Date
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;

