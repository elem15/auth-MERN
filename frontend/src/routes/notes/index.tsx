import { useEffect } from 'react'
import { useGetNotesQuery } from '../../services/noteApi'
import Preloader from '../../components/loader/Preloader'

export const Notes = () => {
  const { data, error, isLoading } = useGetNotesQuery()
  useEffect(() => {
    error && console.error(error)
  }, [error])
  return (
    <>
      {isLoading && <Preloader />}
      <h1>Notes</h1>
      <ul>{data && data.map(note => (
        <li key={note._id}>
          <h2 className='text-lg'>{note.title}</h2>
          <p className='text-base'>{note.text}</p>
        </li>
      ))}</ul>
    </>
  )
}
