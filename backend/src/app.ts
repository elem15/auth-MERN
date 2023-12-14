import 'dotenv/config'
import express from 'express'
import { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import notesRouter from './routes/notes-route'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/app/notes', notesRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  next(error)
})

app.use((error: Error, req: Request, res: Response) => {
  let message = 'An unknown error!'
  if (error instanceof Error) message = error.message
  res.send(500).json({ error: message })
})

export default app
