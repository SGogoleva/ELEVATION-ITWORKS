import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './context/context';
import Login from './pages/login';
import ViewUsers from './pages/viewUsers';
import CreateUsers from './pages/createUser';
import EditUsers from './pages/editUser';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<ViewUsers />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
