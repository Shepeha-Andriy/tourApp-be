import Tour from '../models/tour.js'

export const createTour = async (req, res) => {
  try {
    const tour = req.body
    
    const newTour = new Tour({
    ...tour,
    createdAd: new Date().toISOString()
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

    return res.status(201).json(tours)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong during get all tours' })
  }
}