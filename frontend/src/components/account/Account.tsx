import { FormEvent, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Preloader from '../loader/Preloader'
import { useUpdateUserMutation } from '../../services/usersApi';

export const Account = () => {
  const navigate = useNavigate();
  const [updateUser, { error, isLoading, isSuccess }] = useUpdateUserMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name') as string
    const password = formData.get('password') as string
    updateUser({ name, password })
  }
  useEffect(() => {
    isSuccess && navigate('/people')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  useEffect(() => {
    error && console.log(error)
  }, [error])

  return (
    <>
      {isLoading && <Preloader />}

      <form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit} >
        <input type="text" name="name" required className='border-spacing-2 border-2 mb-6' />
        <input type="password" name="password" required className='border-spacing-2 border-2 mb-6' />
        <button type="submit">submit</button>
      </form>
    </>
  )
}
