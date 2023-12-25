import { Link } from 'react-router-dom'

export const LinkUI = ({ to, children }: LinkProps) => {
  return (
    <Link to={to} className='text-blue-600 hover:text-blue-500 active:text-blue-800 font-semibold'>{children}</Link>
  )
}
