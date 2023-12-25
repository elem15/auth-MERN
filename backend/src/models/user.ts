import { InferSchemaType, Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    img: { type: String, required: false },
  },
  { timestamps: true }
)

type User = InferSchemaType<typeof userSchema>

export const UserModel = model<User>('User', userSchema)
