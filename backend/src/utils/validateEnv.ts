import { cleanEnv, port, str } from 'envalid'

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  MONGO_CONNECTION_IMAGES: str(),
  SESSION_SECRET: str(),
  PORT: port(),
})
