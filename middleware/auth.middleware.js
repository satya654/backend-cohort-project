const jwt = require('jsonwebtoken')
const usermodel = require('../models/user.model')


async function authmiddleware(req,res,next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access please login first"
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usermodel.findOne({
            _id: decode.id
        })
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token please login again"
        })
    }

}

module.exports = authmiddleware