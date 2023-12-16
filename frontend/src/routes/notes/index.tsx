import { useEffect } from 'react'
import { useGetNotesQuery } from '../../services/noteApi'
import Preloader from '../../components/loader/Preloader'
import { Link } from 'react-router-dom'

export const Notes = () => {
  const { data, error, isLoading } = useGetNotesQuery()
  useEffect(() => {
    error && console.error(error)
  }, [error])
  return (
    <>
      {isLoading && <Preloader />}
      <Link to={'/notes/form'}>New note</Link>

      <ul>{data && data.map(note => (
        <li key={note._id}>
          <h2 className='text-lg'>{note.title}</h2>
          <p className='text-base'>{note.text}</p>
        </li>
      ))}</ul>
    </>
  )
}
