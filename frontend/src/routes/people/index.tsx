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

      {data && <>
        <h1 className='text-center text-xl'>All users except you</h1>

        <ul className='flex flex-wrap'>{data.map(user => (
          <li key={user._id}>
            <Card>
              <Image src={user.img} alt={user.name} />
              <h2 className='text-lg'>Name: {user.name}</h2>
              <p className='text-lg'>Age: {user.age}</p>
            </Card>
          </li>
        ))}</ul>
      </>}
    </>
  )
}
