import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"


import Preloader from '../loader/Preloader'
import { useLoginMutation } from '../../services/usersApi'
import { Input } from '../../components/input/Input'
import { Button } from '../../components/button/Button';

export const Login = () => {
  const navigate = useNavigate();
  const [login, { error, isLoading, isSuccess }] = useLoginMutation()

  const validationSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(5)
  })
    .required();

  const onSubmit = (data: UserLogin) => {
    login(data)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLogin>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    isSuccess && navigate('/people')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  useEffect(() => {
    if (error) {
      const e = error as RTKError
      alert(e.data?.error || 'Unknown error')
    }
  }, [error])

  return (
    <>
      {isLoading && <Preloader />}
      <h1 className='text-center text-xl font-semibold'>Log in to your account</h1>
      <br />
      <form className='flex flex-col mx-auto mb-5 w-56' onSubmit={handleSubmit(onSubmit)} >
        <Input labelText="Email" fieldRegister={register("email")}
          error={errors.email?.message} />

        <Input type="password" labelText="Password" fieldRegister={register("password")}
          error={errors.password?.message} />

        <div className='text-center'>
          <Button disabled={!isValid}>Submit</Button>
        </div>
      </form>
    </>
  )
}
