import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-custom-alert'

import Preloader from '../../components/loader/Preloader'
import { useGetUsersQuery } from '../../services/usersApi'
import { Card } from '../../components/card/Card'
import { Image } from '../../components/image/Image'

import s from './index.module.css'

export const People = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetUsersQuery()
  useEffect(() => {
    if (error) {
      const e = error as RTKError
      toast.warning(e.data?.error || 'Unknown error');
      navigate('/')
    }
  }, [error, navigate])

  return (
    <>
      {isLoading && <Preloader />}

      {data && <div className='mt-2 mx-auto'>
        <div className={s.scrollWatcher}></div>
        <h1 className='text-center text-2xl font-semibold'>All users except you</h1>

        <ul className='flex flex-wrap justify-center'>{data.map(user => (
          <li key={user._id}>
            <Card>
              <div className='w-64 h-64 mb-4 rounded-full overflow-hidden flex align-middle justify-center'>
                <Image src={user.img} alt={user.name} width={256}
                  isLoading={isLoading} className='object-cover group-hover:scale-[103%]' />
              </div>
              <h2 className='text-lg'>Name: {user.name}</h2>
              <p className='text-lg w-full'>Age: {user.age} years</p>
            </Card>
          </li>
        ))}</ul>
      </div>}
    </>
  )
}
