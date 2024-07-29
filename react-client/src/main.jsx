import React from 'react'
import ReactDOM from 'react-dom/client'
import './CSS/styles.css';
import Login from './Login.jsx'
import Todos from './Todos.jsx'
import Welcome from './Welcome.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './Signup.jsx'
import { UserProvider } from './UserContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/welcome",
    element:
        <Welcome />
  },
  {
    path: "/tasks",
    element:
        <Todos />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)