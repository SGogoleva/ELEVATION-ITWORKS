import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { User } from '../types/User';
import userData from '../mocks/jsons/users.json'


const Login = () => {
  const USERS: User[] = userData;
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nameValue = formData.get('email') as string; // added type for autofill below
    const passwordValue = formData.get('password') as string; // added type for autofill below

    if (!nameValue.length || !passwordValue.length) {
      setErrorMessage('You must fill all fields!');
      return
    }
    try {
      // const response = await fetch('../mocks/jsons/users.json');
      // const userData = await response.json();
      const currentUser = USERS.find((user: User) => user.email === nameValue && user.password === passwordValue);
      if (currentUser) {
        authCtx.login(currentUser);
        navigate('/');
      }
      setErrorMessage('Invalid email or password!')
    } catch (error) {
      const typedError = error as Error;
      console.error(typedError);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={submitFormHandler}>
        <input type="email" name="email" placeholder="Enter your email" />
        <input type="password" name="password" placeholder="Enter your password" />
        <button className="submit-login">Submit</button>
      </form>
    </>
  );
};

export default Login;
