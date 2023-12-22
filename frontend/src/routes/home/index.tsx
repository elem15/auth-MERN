import { Registration } from '../../widgets/registration/Registration'
import { useState } from 'react'
import { Login } from '../../widgets/login/Login'

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
            <div>Already registered?</div>
            <div>
              <button onClick={() => setSignType(buttonText)} className='text-blue-600 hover:text-blue-500 active:text-blue-800 font-semibold'>{buttonText}</button>
            </div>
          </div>)}
        {signType === 'login' &&
          (<div className='text-center'>
            <Login />
            <div>Don`t have an account?</div>
            <div>
              <button onClick={() => setSignType(buttonText)} className='text-blue-600 hover:text-blue-500 active:text-blue-800 font-semibold'>{buttonText}</button>
            </div>
          </div>)}
      </div>
    </div>)
}
