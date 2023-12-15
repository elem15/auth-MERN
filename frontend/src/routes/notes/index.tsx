import { useEffect } from 'react'
import { useGetNotesQuery } from '../../services/noteApi'
import Preloader from '../../components/loader/Preloader'

export const Notes = () => {
  const { data, error, isLoading } = useGetNotesQuery()
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      {isLoading && <Preloader />}
      {JSON.stringify(data)}
    </div>
  )
}
