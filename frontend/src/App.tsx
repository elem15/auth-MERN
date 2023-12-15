import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import "./index.css";
import { Root } from './routes/root'
import { ErrorPage } from './error-page'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Notes } from './routes/notes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: Loader,
  },
  {
    path: "notes",
    element: <Notes />,
  },
  {
    path: "notes/form",
    element: <div>Form</div>,
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
