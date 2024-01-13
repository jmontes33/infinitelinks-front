import { useState } from 'react';
import UserService from '../services/user.service';
import { useValueStore } from '../store/valueStore';

function RegisterForm() {
  const { setLoginForm } = useValueStore((state) => ({
    setLoginForm: state.setLoginForm,
  }));

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      username: user,
      email: email,
      password: password,
    };

    if (password === repeatPassword) {
      UserService.registerUser(data)
        .then((response) => {
          if (response.status !== 201) {
            setMessage(response.message);
            return;
          }
          setLoginForm(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (
    <div className='flex flex-col gap-10 bg-white main-shadow py-7 px-10 text-[#FFFFF2] rounded-xl min-w-[500px]'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl text-black '>Welcome!</h2>
        <div className='flex flex-col gap-2 text-black '>
          <h2 className='text-3xl'>Sign Up to</h2>
          <p>start shortening links</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-black'>
            Email
          </label>
          <input
            className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
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
        <div className='flex flex-col gap-2'>
          <label htmlFor='repeat-password' className='text-black'>
            Confirm Password
          </label>
          <input
            className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
            type='password'
            name='repeat-password'
            id='repeat-password'
            placeholder='Confirm your Password'
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>
        <p className={message ? 'text-red-500 ' : 'hidden'}>{message}</p>
        <ul
          className={
            message == 'Password must be strong' ? 'text-red-500' : 'hidden'
          }
        >
          <li>Contains at least one lowercase letter.</li>
          <li>It contains at least one capital letter.</li>
          <li>Contains at least one digit.</li>
          <li>Contains at least one of the special characters [@$!%*?&].</li>
          <li>It is between 8 and 20 characters long.</li>
        </ul>
        <button className='bg-black text-white p-4 rounded-md' type='submit'>
          Register
        </button>
        <p className='m-auto text-black '>
          Already have an Account?{' '}
          {
            <button
              onClick={() => {
                setLoginForm(true);
              }}
            >
              Login
            </button>
          }
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
