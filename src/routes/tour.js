import express from "express";
import { createTour, getTours, getTour, getToursByUser, deleteTour, updateTour, getToursBySearch, likeTour } from '../controllers/tour.js'
import auth from "../middleware/auth.js";

const router = express.Router()

router.get('/search', getToursBySearch)
router.get('/getall', getTours)
router.get('/gettour/:id', getTour)

router.post('/create', auth, createTour)
router.patch('/like/:id', auth, likeTour)
router.delete('/delete/:id', auth, deleteTour)
router.patch('/update/:id', auth, updateTour)
router.get('/userTours', auth, getToursByUser)


export default router