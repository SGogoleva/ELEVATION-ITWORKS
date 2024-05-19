import { updateUser } from '../service/users';
import { useEffect, useState } from 'react';
import { getUserById } from '../service/users';

const EditUsers = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [userFound, setUserFound] = useState(false);
  const [error, setError] = useState('');

useEffect(() => {
    const findUser = async () => {
      if(!userId) {
        setUser({ firstName: '', lastName: '', email: '', password: '' });
        setUserFound(false);
        setError('');
        return
      }

      const foundUser = await getUserById(userId);
      if (foundUser) {
        setUser(foundUser);
        setUserFound(true);
      } else {
        setUser({ firstName: '', lastName: '', email: '', password: '' });
        setUserFound(false);
        setError('User not found!');
      }
    };
  findUser()

},[userId, userFound])



  const handleUserChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await updateUser(userId, user)) {
      setError('');
    } else {
      setError('Failed to update user.');
    }
  };

  return (
    <>
      <h1>Edit Users Page</h1>
      <label>
        Input an ID of the user you want to update:
        <input type="text" value={userId} placeholder="Input ID" onChange={(e) => setUserId(e.target.value)} />
      </label>
      {error && <p className="error-msg">{error}</p> }
      {userFound && (
        <form className="update-form" onSubmit={handleUpdateUser}>
          <input type="text" name="firstName" value={user.firstName} placeholder="Update name" onChange={handleUserChanges} />
          <input type="text" name="lastName" value={user.lastName} placeholder="Update lastname" onChange={handleUserChanges} />
          <input type="text" name="email" value={user.email} placeholder="Update email" onChange={handleUserChanges} />
          <input type="text" name="password" value={user.password} placeholder="Update password" onChange={handleUserChanges} />
          <button>Update User</button>
        </form>
      )}
      
    </>
  );
};

export default EditUsers;


