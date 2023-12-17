import { Link } from 'react-router-dom'
import { Registration } from '../components/registration/Registration'
import { useState } from 'react'
import { Login } from '../components/login/Login'

export const Root = () => {
  const flags = {
    login: 'signUp',
    signUp: 'login'
  }
  const [signType, setSignType] = useState(flags.signUp)
  return (
    <div>
      <Link to={'/notes'}>Notes</Link> | <Link to={'/people'}>People</Link>
      <div>
        <button onClick={() => { setSignType(flags[signType as keyof typeof flags]); console.log(signType) }}>{signType}</button>
      </div>
      <div>
        {signType === 'signUp' && <Registration />}
        {signType === 'login' && <Login />}
      </div>
    </div>)
}
