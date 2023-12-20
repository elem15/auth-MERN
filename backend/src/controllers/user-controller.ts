import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { idValidate } from '../models/note'
import { UserModel } from '../models/user'
import { getAge } from '../utils/getAge'
import { filename } from '../middleware/images-upload'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const uploadImage: RequestHandler = (req, res, next) => {
  try {
    res.status(201).json({ filename })
  } catch (e) {
    next(e)
  }
}

export const getUsers: RequestHandler<
  UserId,
  unknown,
  UserDTO[],
  unknown
> = async (req, res, next) => {
  try {
    const authUserId = req.session.userId

    const user = await UserModel.findById(authUserId).select('+email').exec()
    if (!user) {
      throw createHttpError(400, 'Invalid id')
    }
    const users = await UserModel.find({ _id: { $ne: authUserId } })
      .select('+email')
      .exec()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export const getUser: RequestHandler<
  UserId,
  unknown,
  UserDTO,
  unknown
> = async (req, res, next) => {
  try {
    const authUserId = req.session.userId

    if (!idValidate(authUserId)) {
      throw createHttpError(400, 'Invalid id')
    }
    const user = await UserModel.findById(authUserId).select('+email').exec()
    if (!user) {
      throw createHttpError(404, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  UserDTO,
  unknown
> = async (req, res, next) => {
  try {
    const { name, email, password, dateOfBirth, gender } = req.body
    if (!name || !email || !password || !dateOfBirth || !gender) {
      throw createHttpError(
        400,
        'Name, email, password, dateOfBirth and gender are required'
      )
    }
    const user = await UserModel.findOne({ name }).exec()
    if (user) {
      throw createHttpError(404, 'This name is already taken')
    }
    const userWithEmail = await UserModel.findOne({ email }).exec()
    if (userWithEmail) {
      throw createHttpError(404, 'User with this email already exist')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    if (isNaN(Date.parse(dateOfBirth))) {
      throw createHttpError(400, 'Incorrect date format')
    }
    const date = new Date(dateOfBirth)
    const dateNow = new Date()
    const tooYang = date >= dateNow
    const tooOld = getAge(dateNow, date) > 120
    if (tooYang || tooOld) {
      throw createHttpError(400, 'Incorrect date of birth')
    }

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
      dateOfBirth: date.toISOString(),
      gender,
      img: filename,
    })
    req.session.userId = newUser._id
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const login: RequestHandler<
  unknown,
  unknown,
  UserLoginDTO,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw createHttpError(400, 'Email and password are required')
    }

    const user = await UserModel.findOne({ email })
      .select('+password +email')
      .exec()
    if (!user) {
      throw createHttpError(401, 'Email or password are incorrect')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createHttpError(401, 'Email or password are incorrect')
    }

    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}

export const updateUser: RequestHandler<
  UserId,
  unknown,
  UserUpdateDTO,
  unknown
> = async (req, res, next) => {
  try {
    const authUserId = req.session.userId

    const { name, password } = req.body
    if (!(name || password)) {
      throw createHttpError(400, 'No fields for update')
    }
    if (!idValidate(authUserId)) {
      throw createHttpError(400, 'Invalid id')
    }
    const user = await UserModel.findById(authUserId)
      .select('+password +email')
      .exec()
    if (!user) {
      throw createHttpError(404, 'User not found')
    }
    const userWithName = await UserModel.findOne({ name })
      .select('+password')
      .exec()
    if (userWithName) {
      throw createHttpError(404, 'This name is already taken')
    }
    name && (user.name = name)
    password && (user.password = await bcrypt.hash(password, 10))

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
