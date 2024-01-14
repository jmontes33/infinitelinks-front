import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import { useValueStore } from '../store/valueStore';

function Authentication() {
  const { loginForm } = useValueStore((state) => ({
    loginForm: state.loginForm,
  }));

  return (
    <>
      <main className='md:flex hidden flex-col max-w-[1200px] m-auto'>
        <nav className='mt-10'>
          <h1 className='text-black acorn text-6xl'>Infinite URL</h1>
        </nav>
        <section className='flex justify-center items-center h-screen w-full gap-36'>
          {loginForm ? <LoginForm /> : <RegisterForm />}
          <img
            src='src/assets/small-team-discussing-ideas-2194220-0.svg'
            alt=''
          />
        </section>
      </main>
      <main className='flex md:hidden flex-col p-5 '>
        <nav className='my-5'>
          <h1 className='text-black text-center acorn text-6xl'>
            Infinite URL
          </h1>
        </nav>
        <section className=''>
          {loginForm ? <LoginForm /> : <RegisterForm />}
        </section>
      </main>
    </>
  );
}

export default Authentication;
