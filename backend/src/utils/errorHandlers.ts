import { Request, Response, NextFunction } from 'express'
import { isHttpError } from 'http-errors'

export function logErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error)
  next(error)
}
export function clientErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(error)
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  let errorMessage = 'Unknown error'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
}
