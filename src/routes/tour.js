import express from "express";
import { createTour, getTours, getTour, getToursByUser } from '../controllers/tour.js'
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/create', auth, createTour)
router.get('/getall', getTours)
router.get('/gettour/:id', getTour)
router.get('/userTours/:id', auth, getToursByUser)

export default router