import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import zxcvbn from 'zxcvbn'

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(400).json({message: 'user already exist'})
    }

    const passwordStrength = zxcvbn(password).score;
    if (passwordStrength < 3) {
      return res.status(400).json({message: 'Password is too weak, please choose a stronger password'})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` })
    
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({user, token, message: 'successfull signUp'})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during sign up' })
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

    return res.status(201).json({user: isUserExist, token, message: 'successfull signIn'})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during sign in' })
  }
}

export const googleSignIn = async (req, res) => {
  try {
    const { email, name, token, googleId } = req.body

    const existUser = await User.findOne({ email })
    if (existUser) {
      // const user = { _id: existUser._id.toString(), email, name }
      return res.status(200).json({user: existUser, token})
    }
    
    const user = await User.create({ email, name, googleId })
    
    return res.status(201).json({user, token})
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong during google sign in' })
  }
}