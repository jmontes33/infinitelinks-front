import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import { useValueStore } from '../store/valueStore';
import Footer from '../components/Footer';

function Authentication() {
  const { loginForm } = useValueStore((state) => ({
    loginForm: state.loginForm,
  }));

  return (
    <>
      <main className='md:flex hidden flex-col max-w-[1200px] m-auto animate-in gap-16'>
        <nav className='mt-10'>
          <h1 className='text-black acorn text-6xl text-center'>
            Infinite URL
          </h1>
        </nav>
        <section className='flex justify-center w-full gap-36'>
          {loginForm ? <LoginForm /> : <RegisterForm />}
          <img src='public/small-team-discussing-ideas-2194220-0.svg' alt='' />
        </section>
        <section className='flex flex-col justify-center items-center w-full gap-10 mb-24'>
          <h1 className='text-center text-4xl acorn'>
            A simple and fast way to shorten links.
          </h1>
          <img
            src='public/create-link-view.png'
            alt='app image'
            className='hover:translate-y-[-20px] transition-all'
          />
          <img
            src='public/links-view.png'
            alt='app image'
            className='hover:translate-y-[-20px] transition-all'
          />
        </section>
        <Footer />
      </main>
      <main className='flex md:hidden flex-col p-5 animate-in'>
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
