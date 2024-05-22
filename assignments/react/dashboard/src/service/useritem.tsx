import { useContext, useState } from 'react';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const UserItem: React.FC<{ user: User }> = ({ user }) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleEditClick = () => {
    navigate('/edit-users', { state: { user } });
  };
  const handleDeleteClick = async () => {
    const result = await userCtx.deleteUser(user.id);
    if (!result) {
      setError('Unable to delete user');
    }
  };
  return (
    <>
      <div className="user-item">
        <p>ID: {user.id}</p>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default UserItem;

// /edit-users
