import { Router } from 'express'
import {
  signUp,
  getUser,
  getUsers,
  updateUser,
  login,
  logout,
  uploadImage,
} from '../controllers/user-controller'
import { checkAuth } from '../middleware/auth'
import { upload } from '../middleware/images-upload'

const router = Router()

router.get('/', checkAuth, getUsers)
router.get('/one', checkAuth, getUser)
router.post('/signup', upload.single('img'), signUp)
router.post('/login', login)
router.post('/logout', logout)
router.put('/account', checkAuth, updateUser)
router.post('/images', upload.single('img'), uploadImage)

export default router
