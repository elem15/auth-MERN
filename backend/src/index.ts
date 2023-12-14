import app from './app';
import mongoose from 'mongoose';
import validateEnv from './utils/validateEnv'

const PORT = validateEnv.PORT

mongoose.connect(validateEnv.MONGO_CONNECTION_STRING).then(() => {
  console.log('Connected');
  app.get("/net", (req, res) => {
    res.send("Connected")
  })
  app.listen(PORT, () => {
    console.log('Server start on port: localhost:' + PORT)
  })
}).catch((e) => console.error(e))
