import mongoose from 'mongoose'
import Tour from '../models/tour.js'

export const createTour = async (req, res) => {
  try {
    const tour = req.body
    
    const newTour = new Tour({
      ...tour,
      creator: req.userId,
      createdAt: new Date().toISOString()
    })
    
    await newTour.save()

    return res.status(201).json({tour: newTour, message: 'Tour successfully created'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during creating tour' })
  }
}

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find()

    return res.status(200).json(tours)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during get all tours' })
  }
}

export const getTour = async (req, res) => {
  try {
    const { id } = req.params
    const tour = await Tour.findById(id)

    return res.status(200).json(tour)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during get tour' })
  }
}

export const getToursByUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'User doesn\'t exist' })
    }

    const userTours = await Tour.find({creator: id})

    return res.status(200).json(userTours)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during get tours by user' })
  }
}
