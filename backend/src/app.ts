import 'dotenv/config'
import express from 'express'
import { Request, Response } from 'express'
import morgan from 'morgan'
import notesRouter from './routes/notes-route'
import bodyParser from 'body-parser'
import { createJSONError } from './utils/createJSONError'

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/app/notes', notesRouter)

app.use((req, res) => {
  createJSONError(res, 404, 'Route not found')
})

app.use((error: Error, req: Request, res: Response) => {
  console.error(error)

  let message = 'An unknown error!'
  if (error?.message) message = error.message

  createJSONError(res, 500, message)
})

export default app
