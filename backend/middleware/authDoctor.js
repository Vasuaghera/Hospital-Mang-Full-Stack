import jwt from 'jsonwebtoken'

// doctor authentication 
const authDoctor = async (req, res, next) => {
    try {
        // get doctor token from headers
        const { dtoken } = req.headers
        // if not found then send res 
        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }    
        // decode token and verify with secret
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;