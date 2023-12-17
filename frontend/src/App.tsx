import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"
import "./index.css";
import { Root } from './routes/root'
import { ErrorPage } from './error-page'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Notes } from './routes/notes';
import { NotesForm } from './routes/notesForm';
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
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "notes/form",
        element: <NotesForm />,
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
