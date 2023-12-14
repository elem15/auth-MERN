import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import validateEnv from './utils/validateEnv'

const PORT = validateEnv.PORT

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

mongoose.connect(validateEnv.MONGO_CONNECTION_STRING).then(() => {
  console.log('Connected');
  app.listen(PORT, () => {
    console.log('Server start on port: localhost:' + PORT)
  })
}).catch((e) => console.error(e))
