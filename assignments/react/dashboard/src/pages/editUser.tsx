import { updateUser } from '../service/users';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, CreateUser } from '../types/User';
import { UserContext } from '../context/userContext';


const EditUsers = () => {
  const userCtx = useContext(UserContext)
  const location = useLocation()
  const currentUser: User = location.state.user
  const userId = currentUser.id
  const [user, setUser] = useState<CreateUser>({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    password: ''
  });
  const [error, setError] = useState('');


  const handleUserChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await userCtx.updateUser(userId, user)
    if (!result) {
      setError('User have not been updated')
    }
    
  };

  return (
    <>
      <h1>Edit Users Page</h1>
        <form className="update-form" onSubmit={handleUpdateUser}>
          <input type="text" name="firstName" value={user.firstName} placeholder="Update name" onChange={handleUserChanges} />
          <input type="text" name="lastName" value={user.lastName} placeholder="Update lastname" onChange={handleUserChanges} />
          <input type="text" name="email" value={user.email} placeholder="Update email" onChange={handleUserChanges} />
          <input type="text" name="password" value={user.password} placeholder="Update password" onChange={handleUserChanges} />
          <button>Update User</button>
        </form>
        {error && <p>{error}</p>}
    </>
  );
};

export default EditUsers;


