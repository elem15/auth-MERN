import { Registration } from '../../components/registration/Registration'
import { useState } from 'react'
import { Login } from '../../components/login/Login'

export const Home = () => {
  const flags = {
    login: 'signUp',
    signUp: 'login'
  }
  const [signType, setSignType] = useState(flags.signUp)
  const buttonText = flags[signType as keyof typeof flags]
  return (
    <div>

      <div>
        {signType === 'signUp' &&
          (<div className='text-center'>
            <Registration />
            <br />
            <div>Already registered? </div>
            <div>
              <button onClick={() => setSignType(buttonText)}>{buttonText}</button>
            </div>
          </div>)}
        {signType === 'login' &&
          (<div className='text-center'>
            <Login />
            <br />
            <div>Have an account?</div>
            <div>
              <button onClick={() => setSignType(buttonText)}>{buttonText}</button>
            </div>
          </div>)}
      </div>
    </div>)
}
