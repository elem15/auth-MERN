import { useEffect } from 'react'
import Preloader from '../../components/loader/Preloader'
import { useGetUsersQuery } from '../../services/usersApi'
import { useNavigate } from 'react-router'
import { Card } from '../../components/card/Card'
import { Image } from '../../components/image/Image'

export const People = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetUsersQuery()
  useEffect(() => {
    if (error) {
      const e = error as RTKError
      alert(e.data?.error || 'Unknown error');
      navigate('/')
    }
  }, [error, navigate])

  return (
    <>
      {isLoading && <Preloader />}

      {data && <div className='mt-2 mx-auto'>
        <h1 className='text-center text-2xl font-semibold'>All users except you</h1>

        <ul className='flex flex-wrap justify-center'>{data.map(user => (
          <li key={user._id}>
            <Card>
              <Image src={user.img} alt={user.name} />
              <h2 className='text-lg'>Name: {user.name}</h2>
              <p className='text-lg w-full'>Age: {user.age}</p>
            </Card>
          </li>
        ))}</ul>
      </div>}
    </>
  )
}
