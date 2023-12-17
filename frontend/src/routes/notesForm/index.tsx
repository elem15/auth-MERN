import { FormEvent, useEffect } from 'react'
import { useCreateNoteMutation } from '../../services/noteApi'
import Preloader from '../../components/loader/Preloader'
import { Link, useNavigate } from "react-router-dom";

export const NotesForm = () => {
  const navigate = useNavigate();
  const [createNote, { error, isLoading, isSuccess }] = useCreateNoteMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const title = formData.get('title') as string
    const text = formData.get('text') as string | undefined
    createNote({ title, text })
  }
  useEffect(() => {
    isSuccess && navigate('/notes')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  useEffect(() => {
    error && console.log(error)
  }, [error])

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
