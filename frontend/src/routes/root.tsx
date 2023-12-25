import { Outlet } from 'react-router-dom'
import { Header } from '../widgets/header/Header'

export const Root = () => {

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
