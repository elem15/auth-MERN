import app from './app'
import mongoose from 'mongoose'
import validateEnv from './utils/validateEnv'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  mongoose
    .connect(validateEnv.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log('Server start on port: ' + PORT)
    })
    .catch((e) => console.error(e))
})
