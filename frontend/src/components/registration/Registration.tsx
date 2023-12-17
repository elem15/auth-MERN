import { FormEvent, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Preloader from '../../components/loader/Preloader'
import { useSignUpMutation } from '../../services/usersApi';

export const Registration = () => {
  const navigate = useNavigate();
  const [signUp, { error, isLoading, isSuccess }] = useSignUpMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const gender = formData.get('gender') as string
    signUp({ name, email, password, dateOfBirth, gender })
    // console.log({ name, email, password, dateOfBirth, gender })
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
      <Link to={'/'}>🔙Home</Link>
      <Link to={'/notes'}>Notes</Link>
      <form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit} >
        <input type="text" name="name" required className='border-spacing-2 border-2 mb-6' />
        <input type="email" name="email" required className='border-spacing-2 border-2 mb-6' />
        <input type="password" name="password" required className='border-spacing-2 border-2 mb-6' />
        <input type="date" name="dateOfBirth" required className='border-spacing-2 border-2 mb-6' />
        <select name="gender" className='border-spacing-2 border-2 mb-6' >
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  )
}
