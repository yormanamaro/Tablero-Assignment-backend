import { BrowserRouter, Routes, Route} from 'react-router-dom'; // previamente instalamos libreria React-router-dom como -SE y la importamos
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPages from './pages/LoginPages';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/login' element={<LoginPages />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<h1>Tasks Page</h1>} />
          <Route path='/add-task' element={<h1>new task</h1>} />
          <Route path='/tasks/:id' element={<h1>update task</h1>} />
          <Route path='/profile' element={<h1>profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App