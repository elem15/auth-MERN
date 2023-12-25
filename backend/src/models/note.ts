import mongoose, { InferSchemaType, Schema, model } from 'mongoose'

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
)

type Note = InferSchemaType<typeof noteSchema>

export const NoteModel = model<Note>('Note', noteSchema)

export const idValidate = mongoose.isValidObjectId
