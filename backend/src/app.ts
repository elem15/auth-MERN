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

const app = express()
app.use(morgan('dev'))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use('/app/notes', notesRoute)
app.use('/app/users', usersRoute)
app.use(() => {
  throw createHttpError(404, 'Route not found!')
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
