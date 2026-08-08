import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema({
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

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    checkoutItems: [checkoutItemSchema],
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
    isFinalised: {
        type: Boolean,
        default: false
    },
    finalisedAt: {
        type: Date
    }
}, { timestamps: true });

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;
