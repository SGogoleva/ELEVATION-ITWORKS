import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const loginHandler = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setUser(initialState.user);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}
