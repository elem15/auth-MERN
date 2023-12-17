import { useEffect } from 'react'
import Preloader from '../../components/loader/Preloader'
import { useGetUsersQuery } from '../../services/usersApi'

export const People = () => {
  const { data, error, isLoading } = useGetUsersQuery()
  useEffect(() => {
    error && console.error(error)
  }, [error])
  return (
    <>
      {isLoading && <Preloader />}
      <h1>All users except you</h1>

      <ul>{data && data.map(user => (
        <li key={user._id}>
          <h2 className='text-lg'>{user.name}</h2>
          <p className='text-base'>{user.age}</p>
        </li>
      ))}</ul>
    </>
  )
}
