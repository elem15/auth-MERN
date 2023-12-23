import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"

import Preloader from '../../components/loader/Preloader'
import { useSignUpMutation } from '../../services/usersApi';
import { H1 } from '../../components/h1/H1';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';

export const Registration = () => {
  const navigate = useNavigate();
  const [signUp, { error, isLoading, isSuccess }] = useSignUpMutation()

  const validationSchema = z.object({
    name: z.string().min(6),
    email: z.string().email("Please enter a valid email"),
    password: z.string()
      .min(6)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Use letters in different cases and numbers"
      ),
    dateOfBirth: z.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
      .min(new Date("1917-01-01"), { message: "Too old" })
      .max(new Date('2017-01-01'), { message: "Too young!" })
  })
    .required();

  const onSubmit = (data) => {
    console.log(data)
    // const formData = new FormData()

    // signUp(formData)
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    // const name = formData.get('name') as string
    // const email = formData.get('email') as string
    // const password = formData.get('password') as string
    // const dateOfBirth = formData.get('dateOfBirth') as string
    // const gender = formData.get('gender') as string
    // const reqFormData = new FormData()
    // reqFormData.append('name', name)
    // reqFormData.append('email', email)
    // reqFormData.append('password', password)
    // reqFormData.append('dateOfBirth', dateOfBirth)
    // reqFormData.append('gender', gender)

    // file && formData.append('img', file);

    signUp(formData)
  }

  useEffect(() => {
    isSuccess && navigate('/people')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  useEffect(() => {
    if (error) {
      const e = error as RTKError
      alert(e.data?.error || 'Unknown error');
    }
  }, [error])

  const dateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value as string
    if (!isNaN(Date.parse(d))) {
      setValue('dateOfBirth', new Date(d))
      trigger()
    }
  }


  return (
    <>
      {isLoading && <Preloader />}
      <H1>Create new account</H1>
      <Form className='flex flex-col mx-auto w-36' onSubmit={handleSubmit(onSubmit)} >
        <Input type="text" labelText="Name" fieldRegister={register("name")}
          error={errors.name?.message} />
        <Input type="email" labelText="Email" fieldRegister={register("email")}
          error={errors.email?.message} />
        <Input type="password" labelText="Password" fieldRegister={register("password")}
          error={errors.password?.message} />
        <Input type="date" min="1917-01-01" max='2017-01-01' labelText="Date of birth" onChange={dateOnChange} error={errors.dateOfBirth?.message} />
        <select name="gender"  >
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <input type="file" name="img" accept="image/png, image/jpeg" className='border-spacing-2 border-2 mb-6' />
        <div>
          <Button disabled={!isValid || isLoading}>Submit</Button>
        </div>
      </Form>
    </>
  )
}
