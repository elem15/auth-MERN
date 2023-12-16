import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { idValidate } from '../models/note'
import { UserModel } from '../models/user'
import { UserId, UserDTO, UserUpdateDTO } from '../types/user'

export const getUsers: RequestHandler<
  UserId,
  unknown,
  UserDTO[],
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!userId || !idValidate(userId)) {
      const users = await UserModel.find().exec()
      res.status(200).json(users)
      return
    }
    const user = await UserModel.findById(userId).exec()
    if (!user) {
      const users = await UserModel.find().exec()
      res.status(200).json(users)
      return
    }
    const users = await UserModel.find({ _id: { $ne: userId } }).exec()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!idValidate(userId)) {
      throw createHttpError(400, 'Invalid id')
    }
    const user = await UserModel.findById(userId).exec()
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
    const { name, email, password, dateOfBirth, gender, image } = req.body
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
      throw createHttpError(404, 'User with this email exist')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
      dateOfBirth,
      gender,
      image,
    })
    res.status(201).json({ userId: newUser._id })
  } catch (error) {
    next(error)
  }
}

export const updateUser: RequestHandler<
  UserId,
  unknown,
  UserUpdateDTO,
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req.params

    const { name, password, image } = req.body
    if (!(name || password || image)) {
      throw createHttpError(400, 'No fields for update')
    }
    if (!idValidate(userId)) {
      throw createHttpError(400, 'Invalid id')
    }
    const user = await UserModel.findById(userId).exec()
    if (!user) {
      throw createHttpError(404, 'User not found')
    }
    const userWithName = await UserModel.findOne({ name }).exec()
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
