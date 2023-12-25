import { Response } from 'express'

export const createJSONError = (
  res: Response,
  status: number,
  message: string
) => {
  res.status(status).json({ error: message })
}
