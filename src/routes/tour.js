import express from "express";
import { createTour, getTours, getTour, getToursByUser, deleteTour, updateTour } from '../controllers/tour.js'
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/create', auth, createTour)
router.get('/getall', getTours)
router.get('/gettour/:id', getTour)
router.delete('/delete/:id', auth, deleteTour)
router.patch('/update/:id', auth, updateTour)
router.get('/userTours', auth, getToursByUser)

export default router