import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<HomePage/>
      },
      {
        path:'register',
        element:<RegisterPage/>
      }
    ]
  },
  {
    path:'/auth/register',
    element:<RegisterPage/>
  },
  {
    path:'/auth/login',
    element:<LoginPage/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
