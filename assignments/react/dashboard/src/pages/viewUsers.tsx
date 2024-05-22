import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { UserContext } from '../context/userContext';
import UserItem from '../service/useritem';

const ViewUsers = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  if (!authCtx.isAuthenticated) {
    navigate('/login');
  }
  return (
    <>
      <h1>View Users Page</h1>
      <ul className="list-users">
        {userCtx.users.map((user) => (
          <li key={user.id}>
            <UserItem user={user} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ViewUsers;
