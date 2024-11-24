import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../styles/index.css';
import Home from './pages/Home.tsx';
import HomeMembro from './pages/HomeMembro.tsx';
import HomeEmpresa from './pages/HomeEmpresa.tsx';
import ScanQR from './pages/ScanQR.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Header from './components/Header.tsx';
import CadastroEvento from './pages/CadastroEventos.tsx';
import NavigationBar from './components/NavigationBar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <>Erro ao carregar a página</>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/mem',
        element: <>
          <Header />
          <HomeMembro />
          <NavigationBar />
        </>,
      },
      {
        path: '/emp',
        element: <>
          <Header />
          <HomeEmpresa />
          <NavigationBar />
        </>,
      },
      {
        path: '/cadastro',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: "/cadastro-evento",
        element: <CadastroEvento />,
      },
      {
        path: '/scan',
        element: <ScanQR />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
