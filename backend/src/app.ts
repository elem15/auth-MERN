import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import morgan from 'morgan'
import notesRoute from './routes/notes-route'
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

const app = express()
app.use(morgan('dev'))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

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
app.use('/app/notes', notesRoute)
app.use('/app/users', usersRoute)
app.use(() => {
  throw createHttpError(404, 'Route not found!')
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
