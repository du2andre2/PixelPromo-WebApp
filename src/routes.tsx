import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import Home from './pages/app/home';
import Promotion from './pages/app/promotion';
import Perfil from './pages/app/userPerfil';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: '/', element: <Navigate to="/sign-in" /> }, 
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'promotion/:id', element: <Promotion /> },
      { path: 'user/:id', element: <Perfil /> },
    ],
  },
]);
