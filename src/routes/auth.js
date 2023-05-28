import express from "express";
const router = express.Router()

import { signup, signin, googleSignIn } from '../controllers/auth.js'

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/googleauth', googleSignIn)

export default router