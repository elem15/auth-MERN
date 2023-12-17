import { useEffect } from 'react'
import Preloader from '../../components/loader/Preloader'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../../services/usersApi'

export const People = () => {
  const { data, error, isLoading } = useGetUsersQuery()
  useEffect(() => {
    error && console.error(error)
  }, [error])
  return (
    <>
      {isLoading && <Preloader />}
      <Link to={'/notes/form'}>New note</Link>

      <ul>{data && data.map(user => (
        <li key={user._id}>
          <h2 className='text-lg'>{user.name}</h2>
          <p className='text-base'>{user.email}</p>
        </li>
      ))}</ul>
    </>
  )
}
