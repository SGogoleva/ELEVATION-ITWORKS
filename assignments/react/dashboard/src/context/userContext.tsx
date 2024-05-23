import { createContext, useEffect, useState } from 'react';
import { User, CreateUser } from '../types/User';
import {
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUserById as deleteUserService,
  initializeUsers,
} from '../service/users';

type UserState = {
  users: User[];
  createUser: (user: CreateUser) => Promise<{ id: string } | { error: string }>;
  updateUser: (id: string, user: CreateUser) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
};

const initialUserState = {
  users: [],
  createUser: async () => ({ error: 'Function not initialized' }),
  updateUser: async () => false,
  deleteUser: async () => false,
};

export const UserContext = createContext<UserState>(initialUserState);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchInitialUsers = async () => {
      const initialUsers = await initializeUsers();
      console.log('Fetching users from service in context');
      console.log(initialUsers);
      setUsers(initialUsers);
    };
    fetchInitialUsers();
  }, []);

  useEffect(() => {
    console.log('Watching changing state in context');
    console.log(users);
  });

  const createUser = async (user: CreateUser) => {
    const result = await createUserService(user);
    if ('id' in result) {
      const idx = users.findIndex((u) => u.id === result.id);
      if (idx === -1) {
        const createdUser = [...users, { ...user, id: result.id }];
        setUsers(createdUser);
        console.log('Created user', createdUser);
      }
    }
    return result;
  };

  const updateUser = async (id: string, user: CreateUser) => {
    const updatedUser = await updateUserService(id, user);
    if (updatedUser) {
      setUsers((currentUsers) => currentUsers.map((item) => (item.id === id ? { ...user, id: id } : item)));
    }
    return updatedUser;
  };

  const deleteUser = async (id: string) => {
    const deletedUser = await deleteUserService(id);
    if (deletedUser) {
      setUsers((currentUser) => currentUser.filter((user) => user.id !== id));
    }
    return deletedUser;
  };

  return (
    <>
      <UserContext.Provider value={{ users, createUser, updateUser, deleteUser }}>{children}</UserContext.Provider>
    </>
  );
};
