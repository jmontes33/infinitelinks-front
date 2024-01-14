import { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { useValueStore } from '../store/valueStore';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function LoginForm() {
  const { setUserToken, setUserName, setLoginForm } = useValueStore(
    (state) => ({
      setUserToken: state.setUserToken,
      setUserName: state.setUserName,
      setLoginForm: state.setLoginForm,
    })
  );
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCredentials, setWrongCredentials] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      const decodedToken = (jwtDecode as any)(storedToken).username;
      setUserToken(storedToken);
      setUserName(decodedToken);
    }
  }, [setUserToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      username: user,
      password: password,
    };

    UserService.loginUser(data)
      .then((response) => {
        if (response.status !== 200) {
          setWrongCredentials(true);
          return;
        }
        setUserToken(response.message.access_token);
        Cookies.set('token', response.message.access_token, {
          expires: 7,
        });

        const decodedToken = (jwtDecode as any)(
          response.message.access_token
        ).username;

        setUserName(decodedToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='md:flex hidden flex-col gap-10 bg-white py-7 px-10 text-[#FFFFF2] rounded-xl min-w-[500px] main-shadow'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl text-black'>Welcome!</h2>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-black'>Sign In to</h2>
            <p className='text-black'>start shortening links</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='username' className='text-black'>
              Username
            </label>
            <input
              className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
              type='text'
              name='username'
              id='username'
              placeholder='Enter your username'
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-black'>
              Password
            </label>
            <input
              className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p
            className={
              wrongCredentials ? 'text-red-500' : 'text-red-500 hidden'
            }
          >
            The username or password entered is not correct
          </p>
          <div className='flex justify-between'>
            <div className='flex gap-3 text-black'>
              <input type='checkbox' name='' id='rememberMeDesktop' />
              Remember me
            </div>
            <p className='text-black'>Forgot password?</p>
          </div>
          <button className='bg-black text-white p-4 rounded-md' type='submit'>
            Login
          </button>
          <p className='m-auto text-black'>
            Don't have an Account?{' '}
            {<button onClick={() => setLoginForm(false)}>Register</button>}
          </p>
        </form>
      </div>
      <div className='flex md:hidden flex-col gap-10 bg-white text-[#FFFFF2] rounded-xl main-shadow py-7 px-10'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl text-black'>Welcome!</h2>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-black'>Sign In to</h2>
            <p className='text-black'>start shortening links</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='username' className='text-black'>
              Username
            </label>
            <input
              className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
              type='text'
              name='username'
              id='username-mobile'
              placeholder='Enter your username'
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-black'>
              Password
            </label>
            <input
              className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
              type='password'
              name='password'
              id='password-mobile'
              placeholder='Enter your password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p
            className={
              wrongCredentials ? 'text-red-500' : 'text-red-500 hidden'
            }
          >
            The username or password entered is not correct
          </p>
          <div className='flex justify-between'>
            <p className='text-black'>Forgot password?</p>
          </div>
          <button className='bg-black text-white p-4 rounded-md' type='submit'>
            Login
          </button>
          <p className='m-auto text-black'>
            Don't have an Account?{' '}
            {<button onClick={() => setLoginForm(false)}>Register</button>}
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
