import { Router } from 'express'
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '../controllers/notes-controller'

const router = Router()

router.get('/', getNotes)
router.get('/:noteId', getNote)
router.post('/', createNote)
router.put('/:noteId', updateNote)
router.delete('/:noteId', deleteNote)

export default router
