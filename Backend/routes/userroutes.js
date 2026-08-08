import express from "express"
import user from "../models/user.js"
import jwt from "jsonwebtoken"
const authroute = express.Router()
import { protect } from "../middleware/authmiddleware.js"


//Register user
authroute.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {

        let checkuser = await user.findOne({ email })
        if (checkuser) {
            return res.status(400).json({ message: "User already exists" })
        }
        checkuser = new user({ name, email, password })
        await checkuser.save()
        const payload = { user: { id: checkuser._id, role: checkuser.role } }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) throw err
            res.status(201).json({
                user: {
                    _id: checkuser._id,
                    role: checkuser.role,
                    email: checkuser.email,
                    name: checkuser.name
                }, token
            })
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})

authroute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const findinguser = await user.findOne({ email })
        if (!findinguser) {
            res.status(400).json({ message: "User does not exist" })
        }
        const ismatch = await findinguser.checkpass(password)
        if (!ismatch) {
            return res.status(400).json({ message: "Password does not match" })
        }

        const payload = { user: { id: findinguser._id, role: findinguser.role } }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) throw err
            res.json({
                user: {
                    _id: findinguser._id,
                    role: findinguser.role,
                    email: findinguser.email,
                    name: findinguser.name
                }, token
            })
        }
        )
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})


authroute.get("/profile", protect, async (req, res) => {
    res.json(req.user)
})




export default authroute