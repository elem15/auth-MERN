import { useNavigate } from 'react-router-dom'
import { useGetUserQuery, useLogoutMutation } from '../../services/usersApi'
import { LinkUI } from '../../components/link/LinkUI'
import { ButtonLink } from '../../components/button/ButtonLink'

export const Header = () => {
  const { isSuccess } = useGetUserQuery()

  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div>
      <header className='flex justify-between px-5 py-3 mb-7 border-b-2'>
        <div>
          <LinkUI to={'/'}>Home</LinkUI>{
            isSuccess && <> | <LinkUI to={'/people'}>People</LinkUI> | <LinkUI to={'/account'}>Account</LinkUI>
            </>
          }
        </div>
        {isSuccess && <ButtonLink onClick={handleLogout}>Logout</ButtonLink>}
      </header >
    </div >
  )
}
