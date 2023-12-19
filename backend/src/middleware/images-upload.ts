import mongoose from 'mongoose'
import validateEnv from '../utils/validateEnv'
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import multer from 'multer'
// import { conn } from '../index'

// import createHttpError from 'http-errors'
// import path from 'path'
// {
//
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

const mongoURI = validateEnv.MONGO_CONNECTION_STRING

// mongoose.connect(mongoURI, { useNewUrlParser: true })
const conn = mongoose.createConnection(mongoURI)

let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  console.log('Connection Successful')
})

// Create storage engine
let filename
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        filename = Date.now() + file.originalname
        const fileInfo = {
          filename: Date.now() + filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})

export const upload = multer({ storage })

// conn.once('open', () => {
//   new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'uploads',
//   })
//   // gfs = Grid(conn.db, mongoose.mongo)
//   // gfs.collection('uploads')
//   console.log('Connection Successful')
// })

// conn.once('open', () => {
//   const gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection('uploads')
//   console.log('Connection Successful')
// })

// let filename
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         filename = file.originalname
//         const fileInfo = {
//           filename: Date.now() + filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   },
// })

// const storage = new GridFsStorage({
//   url: mongoURI,
//   options: { useNewUrlParser: true },
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         const filename = Date.now() + file.originalname
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   },
// })
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         const filename = `${Date.now()}-uploads-${file.originalname}`
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   },
// })
// const storage = new GridFsStorage({
//   url: mongoURI,
//   // options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     try {
//       const match = ['image/png', 'image/jpeg', 'image/jpg']

//       if (match.indexOf(file.mimetype) === -1) {
//         throw new Error('Invalid file format')
//       }
//       // console.log('image-bucket: ', process.env.IMAGE_BUCKET)
//       // console.log('upload-file: ', file)
//       return {
//         bucketName: 'uploads',
//         filename: `${Date.now()}-uploads-${file.originalname}`,
//       }
//     } catch (error) {
//       console.log('error: ', error)
//     }
//   },
//   try {
//     return new Promise((resolve, reject) => {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         const filename = file.originalname
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   } catch (e) {
//     console.error('file error: ', e)
//     createHttpError(400, 'file output error')
//   }
// },
// })
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })
// export const upload = multer({ storage })
