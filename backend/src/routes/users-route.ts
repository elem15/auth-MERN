import { Router } from 'express'
import {
  signUp,
  getUser,
  getUsers,
  updateUser,
  login,
  logout,
} from '../controllers/user-controller'
import { checkAuth } from '../middleware/auth'

const router = Router()

router.get('/', checkAuth, getUsers)
router.get('/one', checkAuth, getUser)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.put('/account', checkAuth, updateUser)

export default router
