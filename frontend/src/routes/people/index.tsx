import { useEffect } from 'react'
import Preloader from '../../components/loader/Preloader'
import { useGetUsersQuery } from '../../services/usersApi'
import { useNavigate } from 'react-router'

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

      <h1 className='text-center text-xl'>All users except you</h1>

      <ul>{data && data.map(user => (
        <li key={user._id}>
          <h2 className='text-lg'>{user.name}</h2>
          <p className='text-base'>{user.age}</p>
          {user?.img && <img src={user.img} alt={user.name} />}
        </li>
      ))}</ul>
    </>
  )
}
