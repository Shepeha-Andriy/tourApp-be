import express from "express";
import rateLimit from 'express-rate-limit'
import { signup, signin, googleSignIn } from '../controllers/auth.js'

const router = express.Router()
const appLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10
})

router.post('/signup', signup)
router.post('/signin', appLimiter, signin)
router.post('/googleauth', googleSignIn)

export default router