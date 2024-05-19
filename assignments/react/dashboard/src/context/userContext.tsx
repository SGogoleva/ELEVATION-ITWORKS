import { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import userData from '../mocks/jsons/users.json';

type UserState = {
  users: User[];
  createUser: (userData: User) => void;
  updateUser: (userData: User) => void;
  deleteUser: (id: string) => void;
};

const initialUserState = {
  users: userData,
  createUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};

export const UserContext = createContext<UserState>(initialUserState);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState(userData);
  const createUser = (userData: User) => {
    setUsers((currentUser) => [...currentUser, userData]);
  };
  const updateUser = (userData: User) => {
    setUsers((currentUser) => currentUser.map((user) => (user.id === userData.id ? userData : user)));
  };
  const deleteUser = (id: string) => {
    setUsers((currentUser) => currentUser.filter((user) => user.id !== id));
  };

  return (
    <>
      <UserContext.Provider value={{ users, createUser, updateUser, deleteUser }}>{children}</UserContext.Provider>;
    </>
  );
};
