import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-custom-alert/dist/index.css'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-custom-alert'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer floatingTime={3000} />
  </React.StrictMode>,
)
