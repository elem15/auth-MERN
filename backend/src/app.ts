import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import morgan from 'morgan'
import notesRouter from './routes/notes-route'
import bodyParser from 'body-parser'
import createHttpError from 'http-errors'
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
} from './utils/errorHandlers'

const app = express()
app.use(morgan('dev'))

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders:
    'Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use('/app/notes', notesRouter)
app.use(() => {
  throw createHttpError(404, 'Route not found!')
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
