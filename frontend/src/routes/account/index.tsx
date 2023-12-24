import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-custom-alert';
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Preloader from '../../components/loader/Preloader'

import { useGetUserQuery, useUpdateUserMutation } from '../../services/usersApi';
import { H1 } from '../../components/h1/H1';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { FileInput } from '../../components/fileInput/FileInput';
import { Button } from '../../components/button/Button';
import { Image } from '../../components/image/Image';

const CAPTIONS = ['Your current avatar', 'Your previous avatar, it will be updated after confirming the form']

export const Account = () => {
  const navigate = useNavigate();
  const { data, error: getQueryError, isLoading: getQueryIsLoading } = useGetUserQuery()
  const [updateUser, { error, isLoading, isSuccess }] = useUpdateUserMutation()

  const [file, setFile] = useState<Blob>()
  const [figcaption, setFigcaption] = useState(CAPTIONS[0])

  useEffect(() => {
    file && setFigcaption(CAPTIONS[1])
    !file && isSuccess && setFigcaption(CAPTIONS[0])
  }, [file, isSuccess])

  const validationSchema = z.object({
    name: z.string().min(6).or(z.literal('')),
    password: z.string()
      .min(6)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Use letters in different cases and numbers"
      ).or(z.literal('')),
    confirmPassword: z.string().or(z.literal('')),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file: File = (e.target.files as FileList)[0];
    file ? setFile(file) : setFile(undefined)
  }

  const onSubmit = (data: UserUpdate) => {
    const formData = new FormData()
    for (const key in data) {
      const k = key as keyof typeof data
      k !== 'confirmPassword' && k !== 'img' && formData.append(k, data[k])
    }
    file && formData.append('img', file)
    updateUser(formData)
    setFile(undefined)
  }

  useEffect(() => {
    if (getQueryError) {
      const e = getQueryError as RTKError
      toast.warning(e.data?.error || 'Unknown error');
      getQueryError && navigate('/')
    }
  }, [getQueryError, navigate])

  useEffect(() => {
    if (error) {
      const e = error as RTKError
      toast.warning(e.data?.error || 'Unknown error');
    }
  }, [error])

  return (
    <>
      {(isLoading || getQueryIsLoading) && <Preloader />}
      {true &&
        <div className='flex flex-col items-center justify-center my-1'>
          <H1>Update account</H1>

          <figure className='w-64 flex flex-col items-center my-1'>
            <Image src={data?.img} alt='Avatar of user' />
            <figcaption className='text-center w-full'>{figcaption}</figcaption>
          </figure>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" labelText='New name' placeholder={data?.name}
              fieldRegister={register("name")} error={errors.name?.message} />
            <Input type="password" labelText='New password'
              fieldRegister={register("password")} error={errors.password?.message} />
            <Input type="password" labelText='Confirm password'
              fieldRegister={register("confirmPassword")} error={errors.confirmPassword?.message} />
            <FileInput onChange={handleChange} labelText='Load new avatar' />
            <div className='text-center w-full'>
              <Button>Submit</Button>
            </div>
          </Form>
        </div>}
    </>
  )
}
