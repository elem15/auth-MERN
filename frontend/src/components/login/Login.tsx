import { FormEvent, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Preloader from '../loader/Preloader'
import { useLoginMutation } from '../../services/usersApi';

export const Login = () => {
  const navigate = useNavigate();
  const [login, { error, isLoading, isSuccess }] = useLoginMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    login({ email, password })
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
      <Link to={'/'}>🔙Home</Link>
      <Link to={'/notes'}>Notes</Link>
      <form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit} >
        <input type="email" name="email" required className='border-spacing-2 border-2 mb-6' />
        <input type="password" name="password" required className='border-spacing-2 border-2 mb-6' />

        <button type="submit">submit</button>
      </form>
    </>
  )
}
