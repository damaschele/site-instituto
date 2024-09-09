import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Contactos from './Components/Contactos/Contactos';
import Cursos from './Components/Cursos/Cursos';
import CursosDash from './Components/dashboard/CursosDash/CursosDash';
import Dashboard from './Components/dashboard/dashboard';
import HomeDash from './Components/dashboard/HomeDash/HomeDash';
import LivrosDash from './Components/dashboard/LivrosDash/LivrosDash';
import Eventos from './Components/Eventos/Eventos';
import Layout from './Components/Layout/Layout';
import Livros from './Components/Livros/Livros';
import Login from './Components/Login/Login';
import NotAuthorized from './Components/NotAuthorized/NotAuthorized'; // Página de acesso negado
import Home from './Components/pages/Home';
import ProtectedRoute from './Components/PrivateRoute/PrivateRoute';
import Sobre from './Components/Sobre/Sobre';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cursos', element: <Cursos /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/eventos', element: <Eventos /> },
      { path: '/contactos', element: <Contactos /> },
      
      {
        path: '/livros',
        element: (
          <ProtectedRoute
            element={<Livros />}
            allowedRoles={['Estudante', 'admin']} // Apenas usuários com perfil de 'student' ou 'admin' podem acessar
          />
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute
        element={<Dashboard />}
        allowedRoles={['admin']}
        
      />
    ),
    children: [
      { 
        index: true, 
        element: <HomeDash /> },
        { 
          path: 'homeDash',
          element: <HomeDash /> },
      {
        path: 'cursosDash',
        element: <CursosDash />,
      },
      {
        path: 'livrosDash',
        element: <LivrosDash />,
      },
    ],
  },
  { path: '/not-authorized', element: <NotAuthorized /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
