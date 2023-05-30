import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500
    
    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET)
      
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      
      const googleId = decodedData?.sub.toString()
      const user = await User.findOne({ googleId })
      
      req.userId = user?._id
    }

    next()
  } catch (error) {
    return res.status(400).json({ message: 'unAuthorized' })
  }
}

export default auth
