import 'dotenv/config'
import express from 'express'
import { NextFunction, Request, Response } from 'express'
import NoteModel from './models/note'

const app = express()

app.get('/', async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  next(new Error('Endpoint not found'))
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
