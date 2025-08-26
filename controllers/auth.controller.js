const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')



async function registerController(req, res) {
    const { username, password } = req.body

    const isUseralreadyExit = await usermodel.findOne({ username })
    if (isUseralreadyExit) {
        return res.status(400).json({
            message: "Username already exists"
        })
    }

    const user = await usermodel.create({
        username,
        password : await bcrypt.hash(password,10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token)

    return res.status(201).json({
        message: "user register successfully ", user
    });


    // set cookie


    // 

}


async function loginController(req, res) {
    const { username, password } = req.body

    const user = await usermodel.findOne({
        username
    })
    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({
            message: "invalid password"
        })

    }
    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
    res.cookie('token', token)

    return res.status(201).json({
        message: "user login successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })


}


module.exports = {
    registerController,
    loginController
}