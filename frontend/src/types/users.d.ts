interface User {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: string
  image?: unknown
}
interface UserFromApi extends Omit<User, 'password'> {
  _id: string
  age?: number
  createdAt: string
  updatedAt: string 
}
interface UserUpdate {
  name: string
  password: string
  image?: unknown
}
interface UserLogin {
  email: string
  password: string
}
