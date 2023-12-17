import { Link, Outlet } from 'react-router-dom'

export const Root = () => {

  return (
    <div>
      <Link to={'/'}>Home</Link> | <Link to={'/notes'}>Notes</Link> | <Link to={'/people'}>People</Link> | <Link to={'/account'}>Account</Link> | <Link to={'/notes/form'}>New note</Link>
      <hr />
      <Outlet />
    </div>
  )
}
