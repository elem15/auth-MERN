import { Router } from 'express'
import {
  signUp,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user-controller'

const router = Router()

router.get('/:userId', getUsers)
router.get('/one/:userId', getUser)
router.post('/sign-up', signUp)
router.put('/:userId', updateUser)

export default router
