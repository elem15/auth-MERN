import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

export const checkAuth: RequestHandler<unknown, unknown, unknown, unknown> = (
  req,
  _,
  next
) => {
  if (req.session.userId) {
    next()
  } else {
    next(createHttpError(401, 'User not authorized'))
  }
}
