import mongoose from 'mongoose'
import validateEnv from '../utils/validateEnv'
import { GridFsStorage } from 'multer-gridfs-storage'
import crypto from 'crypto'
import multer from 'multer'
import createHttpError from 'http-errors'

const mongoURI = validateEnv.MONGO_CONNECTION_STRING

mongoose.set('strictQuery', true)

const conn = mongoose.createConnection(mongoURI)

// @ts-ignore
export let gfs

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  })
})

export let filename: string
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          return reject(
            createHttpError(422, 'Only img or png photo format is supported')
          )
        }
        filename = Date.now() + '-' + file.originalname
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})

export const upload = multer({ storage })
