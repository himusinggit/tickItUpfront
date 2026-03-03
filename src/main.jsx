import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
const queryClient=new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
