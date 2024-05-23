import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { UserContext } from '../context/userContext';
import { User, UserLogin } from '../types/User';
// import userData from '../mocks/jsons/users.json'

const Login = () => {
  const userCtx = useContext(UserContext);
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
      return;
    }
    try {
      const currentUser = userCtx.users.find(
        (user: UserLogin) => user.email === nameValue && user.password === passwordValue
      );
      if (currentUser) {
        authCtx.login(currentUser);
        navigate('/');
      }
      setErrorMessage('Invalid email or password!');
    } catch (error) {
      const typedError = error as Error;
      console.error(typedError);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="w-3/6 rounded-lg bg-orange-400 p-4 shadow-2xl">
          <h1 className="font-sans text-5xl text-fuchsia-950 text-center font-bold">Login</h1>
          <form className="flex flex-col mt-10 justify-center place-items-center" onSubmit={submitFormHandler}>
            <input
              className="rounded border border-fuchsia-900 placeholder-purple-300 w-64 bg-orange-50 shadow-md p-1"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <input
              className="mt-5 rounded border border-fuchsia-900 placeholder-purple-300 w-64 bg-orange-50 shadow-md p-1"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <button className="submit-login mt-5 rounded py-1.5 px-4 font-sans font-medium	text-xl text-orange-500 bg-fuchsia-900 hover:bg-fuchsia-950 shadow-xl">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
