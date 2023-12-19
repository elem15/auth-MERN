import app from './app'
import mongoose from 'mongoose'
import validateEnv from './utils/validateEnv'

const PORT = validateEnv.PORT || 5000

app.listen(PORT, () => {
  mongoose
    .connect(validateEnv.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log('Server start on port: localhost:' + PORT)
    })
    .catch((e) => console.error(e))
})
