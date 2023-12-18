import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../services/usersApi'

export const Root = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <Link to={'/'}>Home</Link> | <Link to={'/people'}>People</Link> | <Link to={'/account'}>Account</Link>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
      <Outlet />
    </div>
  )
}
