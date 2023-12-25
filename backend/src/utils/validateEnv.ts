import { cleanEnv, str } from 'envalid'

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  SESSION_SECRET: str(),
})
