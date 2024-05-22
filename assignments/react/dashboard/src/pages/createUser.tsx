import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CreateUser } from '../types/User';

const CreateUsers = () => {
  const userCtx = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim().length || !lastName.trim().length || !email.trim().length || !password.trim().length) {
      setError('All fields are required to be filled!');
      return;
    }

    const newUser: CreateUser = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const result = await userCtx.createUser(newUser);
      if ('error' in result) {
        setError(result.error);
      } else {
        setUserId(result.id);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setError('');
      }
    } catch (error) {
      setError('User have not been created!');
    }
  };

  return (
    <>
      <h1>Create Users Page</h1>
      <form className="create-form" onSubmit={handleCreateUser}>
        <input
          type="text"
          name={firstName}
          placeholder="Input first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name={lastName}
          placeholder="Input last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input type="text" name={email} placeholder="Input email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name={password} placeholder="Input password" onChange={(e) => setPassword(e.target.value)} />
        <button>Create User</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
      {userId && <p className="ok-msg">Successfully created user with id: {userId}</p>}
    </>
  );
};

export default CreateUsers;
