import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import authRouter from './routes/auth.js'
import tourRouter from './routes/tour.js'

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT || 8080
const DB_URL = process.env.DB_URL

//Middleware
// app.use(morgan('dev'))
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

//Routes
app.use('/api/auth', authRouter)
app.use('/api/tour', tourRouter)

app.get('/', (req, res) => {
  res.send('hi')
})

async function start() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    })

    app.listen(PORT, () => {
      console.log(`server started at ${PORT} port`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
