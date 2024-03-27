import { BrowserRouter, Routes, Route} from 'react-router-dom'; // previamente instalamos libreria React-router-dom como -SE y la importamos
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPages from './pages/LoginPages';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/Navbar';



function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              {/* Rutas Publicas */}
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPages />} />
              <Route path='/register' element={<RegisterPage />} />
              {/* Rutas Privadas */}
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
          </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App