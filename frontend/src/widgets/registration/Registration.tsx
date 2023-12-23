import { ChangeEvent, useEffect, useState } from 'react'
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
  const [file, setFile] = useState<Blob>()
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
      .max(new Date('2017-01-01'), { message: "Too young!" }),
    gender: z.string()
  })
    .required();

  const onSubmit = (data: User) => {
    console.log(data)
    data.dateOfBirth = data.dateOfBirth instanceof Date ? data.dateOfBirth.toISOString() : data.dateOfBirth
    const formData = new FormData()
    for (const key in data) {
      const k = key as keyof typeof data
      //@ts-expect-error
      formData.append(k, data[k])
    }
    file && formData.append('img', file)

    signUp(formData)
  }

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<User>({
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

  const imageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files as FileList
    setFile(files[0])
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
        <fieldset className="flex flex-col mb-4 content-start flex-wrap">
          <legend className="text-left font-semibold mb-1 text-green-900">Select a gender</legend>
          <div className='text-start'>
            <input type="radio" value="male" {...register("gender")} />
            <label htmlFor="male" className='ml-2'>Male</label>
          </div>
          <div>
            <input type="radio" value="female" {...register("gender")} />
            <label htmlFor="female" className='ml-2'>Female</label>
          </div>
        </fieldset>
        <input type="file" onChange={imageOnChange} name="img" accept="image/png, image/jpeg" className='border-spacing-2 border-2 mb-6' />
        <div>
          <Button disabled={!isValid || isLoading}>Submit</Button>
        </div>
      </Form>
    </>
  )
}
