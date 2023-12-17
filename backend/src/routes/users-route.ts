import { Router } from 'express'
import {
  signUp,
  getUser,
  getUsers,
  updateUser,
  login,
  logout,
} from '../controllers/user-controller'

const router = Router()

router.get('/', getUsers)
router.get('/one', getUser)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.put('/account', updateUser)

export default router
