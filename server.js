import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import UsersRoutes from './src/routes/usersRoutes.js'
import AuthRoutes from './src/routes/authRoutes.js'
import cors from 'cors'

//Configuration du cors
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  preflightContinue: true,
}

//express app
const app = express()

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/users', UsersRoutes)
app.use('/api/auth', AuthRoutes)

//Connect to DB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT, '🚀')
    })
  })
  .catch((err) => {
    console.log(err)
  })
