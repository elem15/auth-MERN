import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Preloader from '../../components/loader/Preloader'
import { useGetUserQuery, useUpdateUserMutation } from '../../services/usersApi';
import { H1 } from '../../components/h1/H1';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { FileInput } from '../../components/fileInput/FileInput';
import { Button } from '../../components/button/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Account = () => {
  const navigate = useNavigate();
  const { data, error: getQueryError, isLoading: getQueryIsLoading } = useGetUserQuery()
  const [updateUser, { error, isLoading, isSuccess }] = useUpdateUserMutation()

  const [file, setFile] = useState<Blob>()
  const captions = useMemo(() => ['Your current avatar', 'Your previous avatar, it will be updated after confirming the form'], [])
  const [figcaption, setFigcaption] = useState(captions[0])

  useEffect(() => {
    file && setFigcaption(captions[1])
    !file && isSuccess && setFigcaption(captions[0])
  }, [captions, file, isSuccess])

  const validationSchema = z.object({
    name: z.string().min(6),
    password: z.string()
      .min(6)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Use letters in different cases and numbers"
      ),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      {(isLoading || getQueryIsLoading) && <Preloader />}
      {true &&
        <div className='text-center'>
          <figure>
            {data?.img && <img src={data.img} alt='Avatar of user' />}
            <figcaption>{figcaption}</figcaption>
          </figure>

          <H1>Update account</H1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" labelText='New name' placeholder={data?.name}
              fieldRegister={register("name")} error={errors.name?.message} />
            <Input type="password" labelText='New password'
              fieldRegister={register("password")} error={errors.password?.message} />
            <Input type="password" labelText='Confirm password'
              fieldRegister={register("confirmPassword")} error={errors.confirmPassword?.message} />
            <FileInput onChange={handleChange} labelText='Load new avatar' />
            <div>
              <Button disabled={!isValid || isLoading}>Submit</Button>
            </div>
          </Form>
        </div>}
    </>
  )
}
