import mongoose from 'mongoose'
import validateEnv from '../utils/validateEnv'
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import multer from 'multer'
import createHttpError from 'http-errors'

const mongoURI = validateEnv.MONGO_CONNECTION_STRING

const conn = mongoose.createConnection(mongoURI)

let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  console.log('Connection Successful')
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
