import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res, next) => {
    try {
        const checkUsername = await User.findOne({ username: req.body.username })
        if (checkUsername) {
            res.status(409).json("Username is not available!")
        }
        const checkUserEmail = await User.findOne({ email: req.body.email })
        if (checkUserEmail) {
            res.status(409).json("Email is not available!")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(200).json("User has been created")
    } catch (err) {
        next(err)
    }
}

export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json("User or password incorrect!")
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!isPasswordCorrect) return res.status(404).json("User or password incorrect!")
        //Return token
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_KEY)
        const { password, ...others } = user._doc

        res
            .cookie("accessToken", token, {
                httpOnly: true
            })
            .status(200)
            .json({ ...others })
    } catch (err) {
        next(err)
    }
}