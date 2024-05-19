import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './context/context';
import { UserProvider } from './context/userContext';
import Login from './pages/login';
import ViewUsers from './pages/viewUsers';
import CreateUsers from './pages/createUser';
import EditUsers from './pages/editUser';
import LogOut from './pages/logout';
import Layout from './pages/layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ViewUsers />} />
              <Route path="create-users" element={<CreateUsers />} />
              <Route path="edit-users" element={<EditUsers />} />
              <Route path="login" element={<LogOut />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
