interface UserId {
  userId: string
}
interface UserDTO {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: string
  image: unknown
}
interface UserUpdateDTO {
  name: string
  password: string
  image: unknown
}
interface UserLoginDTO {
  email: string
  password: string
}
