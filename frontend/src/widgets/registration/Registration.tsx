import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { toast } from 'react-custom-alert';

import Preloader from '../../components/loader/Preloader'
import { useSignUpMutation } from '../../services/usersApi';
import { H1 } from '../../components/h1/H1';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { RadioGroup } from '../../components/radio-group/RadioGroup';
import { FileInput } from '../../components/fileInput/FileInput';

export const Registration = () => {
  const navigate = useNavigate();
  const [signUp, { error, isLoading, isSuccess }] = useSignUpMutation()
  const [file, setFile] = useState<Blob>()

  const validationSchema = z.object({
    name: z.string().min(6, 'Name must contain at least 6 characters')
      .regex(/^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/,
        'Please enter a name using English letters without spaces, numbers are acceptable'),
    email: z.string().email("Please enter a valid email"),
    password: z.string()
      .min(6, 'Password must contain at least 6 characters')
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Use letters in different cases and numbers"
      ),
    confirmPassword: z.string(),
    dateObj: z.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
      .min(new Date("1917-01-01"), { message: "Too old" })
      .max(new Date('2017-01-01'), { message: "Too young!" }),
    gender: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords do not match"
  })

  const onSubmit = (data: User) => {
    data.dateOfBirth = data.dateObj instanceof Date ? data.dateObj.toISOString() : ''
    const formData = new FormData()
    for (const key in data) {
      const k = key as keyof typeof data
      k !== 'confirmPassword' && k !== 'img' && k !== 'dateObj' && formData.append(k, data[k])
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
      toast.warning(e.data?.error || 'Unknown error');
    }
  }, [error])

  const dateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value as string
    if (!isNaN(Date.parse(d))) {
      setValue('dateObj', new Date(d))
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
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Input type="text" labelText="Name" fieldRegister={register("name")}
          error={errors.name?.message} />
        <Input type="email" labelText="Email" fieldRegister={register("email")}
          error={errors.email?.message} />
        <Input type="password" labelText="Password" fieldRegister={register("password")}
          error={errors.password?.message} />
        <Input type="password" labelText="Confirm Password" fieldRegister={register("confirmPassword")}
          error={errors.confirmPassword?.message} />
        <Input type="date" min="1917-01-01" max='2017-01-01' labelText="Date of birth" onBlur={dateOnChange} error={errors.dateObj?.message} />
        <RadioGroup fieldRegister={register("gender")} radioList={['male', 'female']} />
        <FileInput labelText="Your avatar" onChange={imageOnChange} />
        <div>
          <Button disabled={!isValid || isLoading}>Submit</Button>
        </div>
      </Form>
    </>
  )
}
