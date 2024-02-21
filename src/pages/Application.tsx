import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import LinkService from '../services/link.service';
import { useValueStore } from '../store/valueStore';
import ShorteredLink from '../components/ShorteredLink';
import Footer from '../components/Footer';

function Application() {
  const [active, setActive] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const { setLinkShortened, linkShortenedModal, setLinkShortenedModal } =
    useValueStore((state) => ({
      username: state.username,
      setLinkShortened: state.setLinkShortened,
      linkShortenedModal: state.linkShortenedModal,
      setLinkShortenedModal: state.setLinkShortenedModal,
      setUserName: state.setUserName,
      setUserToken: state.setUserToken,
    }));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      originalUrl: originalUrl,
      shortUrl: shortUrl,
    };

    LinkService.createLink(data)
      .then((response) => {
        if (response.message) {
          setMessage(response.message);
        } else {
          setLinkShortened(response.data.shortUrl);
          setLinkShortenedModal(true);
          setMessage('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className='md:flex hidden flex-col items-center animate-in h-screen'>
        <nav className=''>
          <div className='max-w-[1200px] flex justify-between p-10 m-auto text-black'>
            <div className='flex items-center gap-5'>
              <img src='/link-svgrepo-com 1.svg' alt='' />
              <h1 className='acorn text-4xl'>Infinite URL</h1>
            </div>
          </div>
        </nav>
        <section className='flex flex-col gap-5 my-10'>
          <h1 className='acorn text-8xl text-[#452B1A] text-center text-style'>
            Link Shortener
          </h1>
          <h2 className='text-center text-2xl acorn'>
            A simple and fast way to shorten links.
          </h2>
        </section>
        <section className='flex justify-center main-shadow'>
          {linkShortenedModal ? (
            <ShorteredLink />
          ) : (
            <Tabs className=' min-w-[800px] text-white'>
              <TabList className='flex gap-1'>
                <Tab
                  onClick={() => setActive(false)}
                  className={
                    active
                      ? 'bg-[#F2F1F0] px-5 py-2 rounded-t-lg text-black cursor-pointer border-x-2 border-t-2 satoshi-regular'
                      : 'bg-[#FBF7F5] px-5 py-2 rounded-t-lg text-black cursor-pointer satoshi-regular'
                  }
                >
                  Shorten URL
                </Tab>
              </TabList>
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-7 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='font-bold text-4xl text-black'>
                    Shorten a long link
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-10'
                  >
                    <div className='flex flex-col gap-3'>
                      <h2 className='text-2xl text-black'>Paste a long URL</h2>
                      <p className={message ? 'text-red-500' : 'hidden'}>
                        Short URL is already in use
                      </p>
                      <input
                        onChange={(e) => {
                          setOriginalUrl(e.target.value);
                        }}
                        type='text'
                        name='url'
                        id='url'
                        className='w-full p-2 rounded-md border-2 border-[#E3E3E3] text-black'
                        placeholder='Example: http://super-long-link.com/shorten=it'
                      />
                    </div>
                    <div className='flex flex-col justify-between items-center gap-3'>
                      <div className='flex w-full gap-8'>
                        <h2 className='text-2xl w-full text-black'>Domain</h2>
                        <h2 className='text-2xl w-full text-black'>
                          Enter a back-half (optional)
                        </h2>
                      </div>
                      <div className='flex w-full items-center gap-3'>
                        <select
                          className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
                          name='domain'
                          id='domain'
                        >
                          <option value='infiniteurl'>infiniteurl</option>
                        </select>
                        <h1 className='text-2xl text-black'>/</h1>
                        <input
                          onChange={(e) => {
                            setShortUrl(e.target.value);
                          }}
                          className='w-full p-2 rounded-md border-2 text-black border-[#E3E3E3]'
                          type='text'
                          name='back-half'
                          id='back-half'
                          placeholder='Example: short-link'
                        />
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='text-white bg-black w-full p-3 satoshi-regular font-bold text-2xl rounded-md'
                    >
                      Shorten link
                    </button>
                  </form>
                </div>
              </TabPanel>
            </Tabs>
          )}
        </section>
        <Footer />
      </main>
      <main className='flex md:hidden flex-col items-center h-screen animate-in'>
        <nav className=''>
          <div className='flex justify-center p-5 m-auto text-black'>
            <div className='flex items-center justify-center gap-5'>
              <img src='/link-svgrepo-com 1.svg' alt='' />
              <h1 className='acorn text-4xl'>Infinite URL</h1>
            </div>
          </div>
        </nav>
        <section className='flex flex-col gap-5 my-10 w-full'>
          <h1 className='acorn text-5xl text-[#452B1A] text-center text-style'>
            Link Shortener
          </h1>
          <h2 className='text-center text-xl acorn'>
            A simple and fast way to shorten links.
          </h2>
        </section>
        <section className='flex flex-col items-center justify-center main-shadow'>
          {linkShortenedModal ? (
            <ShorteredLink />
          ) : (
            <Tabs className='text-white p-3'>
              <TabList className='flex gap-1'>
                <Tab
                  onClick={() => setActive(false)}
                  className={
                    active
                      ? 'bg-[#F2F1F0] px-5 py-2 rounded-t-lg text-black cursor-pointer border-x-2 border-t-2 satoshi-regular'
                      : 'bg-[#FBF7F5] px-5 py-2 rounded-t-lg text-black cursor-pointer satoshi-regular'
                  }
                >
                  Shorten URL
                </Tab>
              </TabList>
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-7 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='font-bold text-4xl text-black'>
                    Shorten a long link
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-10'
                  >
                    <div className='flex flex-col gap-3'>
                      <h2 className='text-2xl text-black'>Paste a long URL</h2>
                      <p className={message ? 'text-red-500' : 'hidden'}>
                        Short URL is already in use
                      </p>
                      <input
                        onChange={(e) => {
                          setOriginalUrl(e.target.value);
                        }}
                        type='text'
                        name='url'
                        id='url'
                        className='w-full p-2 rounded-md border-2 border-[#E3E3E3] text-black'
                        placeholder='Example: http://super-long-link.com/shorten=it'
                      />
                    </div>
                    <div className='flex flex-col justify-between items-center gap-1'>
                      <div className='flex w-full gap-8'>
                        <h2 className='text-md w-full text-black'>Domain</h2>
                        <h2 className='text-md w-full text-black'>
                          Enter a back-half
                        </h2>
                      </div>
                      <div className='flex w-full items-center gap-3'>
                        <select
                          className='w-full p-2 text-black rounded-md border-2 border-[#E3E3E3]'
                          name='domain'
                          id='domain'
                        >
                          <option value='infiniteurl'>infiniteurl</option>
                        </select>
                        <h1 className='text-2xl text-black'>/</h1>
                        <input
                          onChange={(e) => {
                            setShortUrl(e.target.value);
                          }}
                          className='w-full p-2 rounded-md border-2 text-black border-[#E3E3E3]'
                          type='text'
                          name='back-half'
                          id='back-half'
                          placeholder='Example: short-link'
                        />
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='text-white bg-black w-full p-3 satoshi-regular font-bold text-2xl rounded-md'
                    >
                      Shorten link
                    </button>
                  </form>
                </div>
              </TabPanel>
            </Tabs>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Application;
