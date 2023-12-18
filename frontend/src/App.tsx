import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"
import "./index.css";
import { Root } from './routes/root'
import { ErrorPage } from './error-page'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { People } from './routes/people';
import { AccountPage } from './routes/account';
import { Home } from './routes/home';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "people",
        element: <People />,
        errorElement: <ErrorPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
        errorElement: <ErrorPage />,
      },
    ]
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )

}

export default App
