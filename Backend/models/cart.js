import mongoose from "mongoose"
const cartitemschema = new mongoose.Schema({  // represent  single product/item
    productid: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1
    },

}, { _id: false })

const cartschema = new mongoose.Schema({   //  fuull cart
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    guestId: {
        type: String
    },
    products: [cartitemschema],
    totalprice: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

const cart = mongoose.model("cart", cartschema)
export default cart;
