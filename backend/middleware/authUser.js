import jwt from 'jsonwebtoken'

// User authentication 
const authUser = async (req, res, next) => {
    
    try {
        // get user token from headers
        const { token } = req.headers
        // if not found then send res
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        // decode token and verify with secret
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;