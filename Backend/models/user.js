import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address "]
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, { timestamps: true })

userschema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userschema.methods.checkpass = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}
const user = mongoose.model("user", userschema)
export default user