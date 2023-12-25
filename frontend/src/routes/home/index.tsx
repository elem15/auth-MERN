import { Registration } from '../../widgets/registration/Registration'
import { useState } from 'react'
import { Login } from '../../widgets/login/Login'
import { ButtonLink } from '../../components/button/ButtonLink'

export const Home = () => {
  const flags = {
    login: 'signup',
    signup: 'login'
  }
  const [signType, setSignType] = useState(flags.signup)
  const buttonText = flags[signType as keyof typeof flags]
  return (
    <div>
      <div>
        {signType === 'signup' &&
          (<div className='text-center'>
            <Registration />
            <div>Already registered?</div>
            <div>
              <ButtonLink onClick={() => setSignType(buttonText)}>{buttonText}</ButtonLink>
            </div>
          </div>)}
        {signType === 'login' &&
          (<div className='text-center'>
            <Login />
            <div>Don`t have an account?</div>
            <div>
              <ButtonLink onClick={() => setSignType(buttonText)}>{buttonText}</ButtonLink>
            </div>
          </div>)}
      </div>
    </div>)
}
