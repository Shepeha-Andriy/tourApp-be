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
    const {page} = req.query
    // const tours = await Tour.find()

    // return res.status(200).json(tours)

    const limit = 6
    const startIndex = (Number(page) - 1) * limit;
    const total = await Tour.countDocuments({})
    const tours = await Tour.find().limit(limit).skip(startIndex)

    return res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit)
    })
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
    // const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: 'User doesn\'t exist' })
    }

    const userTours = await Tour.find({creator: req.userId})

    return res.status(200).json(userTours)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during get tours by user' })
  }
}

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: `No tour exist width id: ${id}` })
    }

    const deletedTour = await Tour.findByIdAndRemove(id)

    return res.status(200).json({deletedTour, message: 'Tour deleted successfully'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during delete tour' })
  }
}

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params
    const { title, descriptions, creator, imageFile } = req.body

    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: `No tour exist width id: ${id}` })
    }

    const updateTourDtos = {
      creator,
      title,
      descriptions,
      imageFile,
      _id: id
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, updateTourDtos, {new: true})

    return res.status(200).json(updatedTour)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during updating tour' })
  }
}

export const getToursBySearch = async (req, res) => {
  try {
    const { searchQuery } = req.query
    const title = new RegExp(searchQuery, 'i')
    const tours = await Tour.find({title})

    return res.json(tours)
    
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong during getting tour by search' })
  }
}

export const likeTour = async (req, res) => {
  try {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: `No tour exist width id: ${id}` })
    }

    const tour = await Tour.findById(id)
    const index = tour.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
      tour.likes.push(req.userId)
    } else {
      tour.likes = tour.likes.filter(id => id !== String(req.userId))
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, tour, { new: true })
    
    return res.status(200).json(updatedTour)
    
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong during like post' })
  }
}