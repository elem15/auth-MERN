interface UserId {
  userId: string
}
interface UserDTO {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: string
  img?: string
}
interface UserUpdateDTO {
  name: string
  password: string
  img?: string
}
interface UserLoginDTO {
  email: string
  password: string
}
