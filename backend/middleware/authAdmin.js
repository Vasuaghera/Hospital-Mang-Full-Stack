import jwt from "jsonwebtoken"

// admin authentication 
const authAdmin = async (req, res, next) => {
    try {
        // get admin token from headers
        const { atoken } = req.headers
        // if not found then send res with message
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        // decode token and verify with secret 
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        // if not match then send res with message
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        // if all good then next
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;