import { RequestHandler } from 'express'
import { NoteModel, idValidate } from '../models/note'
import createHttpError from 'http-errors'

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}
export const getNote: RequestHandler = async (req, res, next) => {
  try {
    const { noteId } = req.params
    if (!idValidate(noteId)) {
      throw createHttpError(400, 'Invalid id')
    }
    const note = await NoteModel.findById(noteId).exec()
    if (!note) {
      throw createHttpError(404, 'Note not found')
    }
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

interface NoteDTO {
  title?: string
  text?: string
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteDTO,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body
    if (!title) {
      throw createHttpError(400, 'Title is required')
    }
    const newNote = await NoteModel.create({
      title,
      text,
    })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

interface NoteId {
  noteId: string
}
export const updateNote: RequestHandler<
  NoteId,
  unknown,
  NoteDTO,
  unknown
> = async (req, res, next) => {
  try {
    const { noteId } = req.params

    const { title, text } = req.body
    if (!title) {
      throw createHttpError(400, 'Title is required')
    }
    const note = await NoteModel.findById(noteId).exec()
    if (!note) {
      throw createHttpError(404, 'Note not found')
    }
    note.title = title
    note.text = text

    const updatedNote = await note.save()

    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
}
