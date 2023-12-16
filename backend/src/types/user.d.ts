export interface UserId {
  userId: string
}
export interface UserDTO {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: string
  image: unknown
}
export interface UserUpdateDTO {
  name: string
  password: string
  image: unknown
}
