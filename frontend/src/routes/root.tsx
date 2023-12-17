import { Link } from 'react-router-dom'
import { Registration } from '../components/registration/Registration'

export const Root = () => {
  return (
    <div>
      <Link to={'/notes'}>Notes</Link>
      <div>
        <Registration />
      </div>
    </div>)
}
