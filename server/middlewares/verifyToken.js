import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id
        next()
    } catch (err){
        return res.status(500).json({message: "server error"})
    }
}

export default verifyToken