import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(400).json({message: 'user already exist'})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` })
    
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({user, token, message: 'successful signUp'})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during signup' })
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
      return res.status(400).json({message: 'user is not exist'})
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({message: 'Wrong email or password'})
    }
    
    
    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({isUserExist, token, message: 'successful signIn'})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during signin' })
  }
}