import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import usersRoute from './routes/users-route'
import bodyParser from 'body-parser'
import createHttpError from 'http-errors'
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
} from './utils/errorHandlers'
import session from 'express-session'
import validateEnv from './utils/validateEnv'
import MongoStore from 'connect-mongo'
import path from 'path'
import serveStatic from 'serve-static'
import mongoose from 'mongoose'

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173/',
      'http://localhost:4173/',
      'http://localhost:5000/',
      'https://auth-mern-0pty.onrender.com',
      'https://auth-mern-client.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))

mongoose
  .connect(validateEnv.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((e) => console.error(e))

app.use(
  session({
    secret: validateEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: validateEnv.MONGO_CONNECTION_STRING,
    }),
  })
)
app.use(serveStatic(path.join(__dirname, '../../frontend/dist/')))
app.use('/api/users', usersRoute)
app.use(() => {
  throw createHttpError(404, 'Route not found!')
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
