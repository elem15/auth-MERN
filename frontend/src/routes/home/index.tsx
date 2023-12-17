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
        <button onClick={() => setSignType(buttonText)}>{buttonText}</button>
      </div>
      <div>
        {signType === 'signUp' && <Registration />}
        {signType === 'login' && <Login />}
      </div>
    </div>)
}
