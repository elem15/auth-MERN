import { FormEvent } from 'react'
import { useCreateNoteMutation } from '../../services/noteApi'
import Preloader from '../../components/loader/Preloader'

export const NotesForm = () => {
  const [createNote, { error, isLoading }] = useCreateNoteMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const title = formData.get('title') as string
    const text = formData.get('text') as string | undefined
    createNote({ title, text })
  }
  error && console.log(error)
  return (
    <>
      {isLoading && <Preloader />}

      <form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit} >
        <input type="text" name="title" required className='border-spacing-2 border-2' />
        <input type="text" name="text" className='border-spacing-2 border-2' />
        <button type="submit">submit</button>
      </form>
    </>
  )
}
