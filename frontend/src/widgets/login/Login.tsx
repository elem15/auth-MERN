import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"

import Preloader from '../../components/loader/Preloader'
import { useLoginMutation } from '../../services/usersApi'
import { Input } from '../../components/input/Input'
import { Button } from '../../components/button/Button';
import { H1 } from '../../components/h1/H1';
import { Form } from '../../components/form/Form';
import { toast } from 'react-custom-alert';

export const Login = () => {
  const navigate = useNavigate();
  const [login, { error, isLoading, isSuccess }] = useLoginMutation()

  const validationSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6)
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
      toast.warning(e.data?.error || 'Unknown error')
    }
  }, [error])

  return (
    <>
      {isLoading && <Preloader />}

      <H1>Log in to your account</H1>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Input labelText="Email" fieldRegister={register("email")}
          error={errors.email?.message} />

        <Input type="password" labelText="Password" fieldRegister={register("password")}
          error={errors.password?.message} />

        <div>
          <Button disabled={!isValid || isLoading}>Submit</Button>
        </div>
      </Form>
    </>
  )
}
