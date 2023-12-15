import { Router } from 'express'
import {
  createNote,
  getNote,
  getNotes,
  updateNote,
} from '../controllers/notes-controller'

const router = Router()

router.get('/', getNotes)
router.get('/:noteId', getNote)
router.post('/', createNote)
router.put('/:noteId', updateNote)

export default router
