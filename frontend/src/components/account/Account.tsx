import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Preloader from '../loader/Preloader'
import { useGetUserQuery, useUpdateUserMutation } from '../../services/usersApi';

export const Account = () => {
  const navigate = useNavigate();
  const { data, error: getQueryError, isLoading: getQueryIsLoading } = useGetUserQuery()
  const [file, setFile] = useState<Blob>()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file: File = (e.target.files as FileList)[0];
    setFile(file)
  }
  const [updateUser, { error, isLoading }] = useUpdateUserMutation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    // const name = formData.get('name') as string
    // const password = formData.get('password') as string
    updateUser(formData)
    setFile(undefined)
  }

  useEffect(() => {
    if (getQueryError) {
      const e = getQueryError as RTKError
      alert(e.data?.error || 'Unknown error');
      getQueryError && navigate('/')
    }
  }, [getQueryError, navigate])

  useEffect(() => {
    if (error) {
      const e = error as RTKError
      alert(e.data?.error || 'Unknown error');
    }
  }, [error])

  return (
    <>
      {isLoading || getQueryIsLoading && <Preloader />}
      <h1 className='text-center text-xl'>Update account</h1>
      <form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor='name'>New name</label>
        <input type="text" name="name" className='border-spacing-2 border-2 mb-6' placeholder={data?.name} autoComplete="false" />
        <label htmlFor='password'>New password</label>
        <input type="password" name="password" className='border-spacing-2 border-2 mb-6' autoComplete="false" />
        <input type="file" name="img" accept="image/png, image/jpeg" onChange={handleChange} className='border-spacing-2 border-2 mb-6' />

        {data?.img && !file && <img src={data.img} alt='Avatar of user' />}
        <button type="submit">submit</button>
      </form>
    </>
  )
}
