interface User {
  name: string
  email: string
  password: string
  dateOfBirth: Date | string
  gender: string
  img?: string
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
  img?: string
}
interface UserLogin {
  email: string
  password: string
}
