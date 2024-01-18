import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import LinkService from '../services/link.service';
import { useValueStore } from '../store/valueStore';
import { LinkDto } from '../repositories/dto/link.dto';
import ShorteredLink from '../components/ShorteredLink';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { LinkData } from '../repositories/dto/link.dto';
import Footer from '../components/Footer';

function Application() {
  const [active, setActive] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const {
    username,
    setLinkShortened,
    linkShortenedModal,
    setLinkShortenedModal,
    setUserName,
    setUserToken,
  } = useValueStore((state) => ({
    username: state.username,
    setLinkShortened: state.setLinkShortened,
    linkShortenedModal: state.linkShortenedModal,
    setLinkShortenedModal: state.setLinkShortenedModal,
    setUserName: state.setUserName,
    setUserToken: state.setUserToken,
  }));
  const [links, setLinks] = useState<LinkData | null>(null);
  const [message, setMessage] = useState('');

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
      username: username,
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

  useEffect(() => {
    LinkService.getallLinks(username)
      .then((response: LinkDto) => {
        setLinks(response.data);
        if (response.status !== 200) {
          Cookies.remove('token', {
            path: '',
            domain: import.meta.env.VITE_APP_DOMAIN,
          });

          window.location.href = '/authentication';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [active]);

  const logout = () => {
    Cookies.remove('token', {
      path: '',
      domain: import.meta.env.VITE_APP_DOMAIN,
    });

    window.location.href = '/authentication';
  };

  return (
    <>
      <main className='md:flex hidden flex-col animate-in h-screen'>
        <nav className=''>
          <div className='max-w-[1200px] flex justify-between p-10 m-auto text-black'>
            <div className='flex items-center gap-5'>
              <img src='public/link-svgrepo-com 1.svg' alt='' />
              <h1 className='acorn text-4xl'>Infinite Links</h1>
            </div>
            <button className='satoshi' onClick={() => logout()}>
              Logout
            </button>
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
                  Short link
                </Tab>
                <Tab
                  onClick={() => setActive(true)}
                  className={
                    active
                      ? 'bg-[#FBF7F5] px-5 py-2 rounded-t-lg text-black cursor-pointer satoshi-regular'
                      : 'bg-[#F2F1F0] px-5 py-2 rounded-t-lg text-black cursor-pointer border-x-2 border-t-2 satoshi-regular'
                  }
                >
                  My links
                </Tab>
              </TabList>
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-7 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='satoshi-regular font-bold text-4xl text-black'>
                    Shorten a long link
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-10'
                  >
                    <div className='flex flex-col gap-3'>
                      <h2 className='satoshi-regular text-2xl text-black'>
                        Paste a long URL
                      </h2>
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
                        <h2 className='satoshi-regular text-2xl w-full text-black'>
                          Domain
                        </h2>
                        <h2 className='satoshi-regular text-2xl w-full text-black'>
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
                        <h1 className='satoshi-regular text-2xl text-black'>
                          /
                        </h1>
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
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-7 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='satoshi-regular font-bold text-4xl text-black'>
                    My Links
                  </h1>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full bg-[#FBF7F5] shadow-md rounded-xl border-2 border-[#E3E3E3]'>
                      <thead>
                        <tr className='text-black satoshi-regular font-bold text-xl bg-[#FBF7F5]'>
                          <th className='py-3 px-4 text-left'>Shorted Link</th>
                          <th className='py-3 px-4 text-left'>Original Link</th>
                          <th className='py-3 px-4 text-left'>Clicks</th>
                          <th className='py-3 px-4 text-left'>Status</th>
                        </tr>
                      </thead>
                      <tbody className='text-blue-gray-900 text-[#452B1A] font-bold'>
                        {Array.isArray(links) &&
                          links.map((link, index) => (
                            <tr
                              key={index}
                              className='border-b border-[#E3E3E3]'
                            >
                              <td className='py-3 px-4'>{link.shortUrl}</td>
                              <td className='py-3 px-4 max-w-[290px] overflow-scroll'>
                                <div className='whitespace-nowrap overflow-scroll'>
                                  {link.originalUrl}
                                </div>
                              </td>
                              <td className='py-3 px-4'>{link.clicks}</td>
                              <td className='py-3 px-4'>{link.state}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          )}
        </section>
        <Footer />
      </main>
      <main className='flex md:hidden flex-col animate-in'>
        <nav className=''>
          <div className='flex justify-center p-5 m-auto text-black'>
            <div className='flex items-center justify-center gap-5'>
              <img src='public/link-svgrepo-com 1.svg' alt='' />
              <h1 className='acorn text-4xl'>Infinite URL</h1>
            </div>
            {/* <button className='satoshi' onClick={() => logout()}>
              Logout
            </button> */}
          </div>
        </nav>
        <section className='flex flex-col gap-5 my-10'>
          <h1 className='acorn text-5xl text-[#452B1A] text-center text-style'>
            Link Shortener
          </h1>
          <h2 className='text-center text-xl acorn'>
            A simple and fast way to shorten links.
          </h2>
        </section>
        <section className='flex justify-center main-shadow'>
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
                  Short link
                </Tab>
                <Tab
                  onClick={() => setActive(true)}
                  className={
                    active
                      ? 'bg-[#FBF7F5] px-5 py-2 rounded-t-lg text-black cursor-pointer satoshi-regular'
                      : 'bg-[#F2F1F0] px-5 py-2 rounded-t-lg text-black cursor-pointer border-x-2 border-t-2 satoshi-regular'
                  }
                >
                  My links
                </Tab>
              </TabList>
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-7 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='satoshi-regular font-bold text-4xl text-black'>
                    Shorten a long link
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-10'
                  >
                    <div className='flex flex-col gap-3'>
                      <h2 className='satoshi-regular text-2xl text-black'>
                        Paste a long URL
                      </h2>
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
                        <h2 className='satoshi-regular text-md w-full text-black'>
                          Domain
                        </h2>
                        <h2 className='satoshi-regular text-md w-full text-black'>
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
                        <h1 className='satoshi-regular text-2xl text-black'>
                          /
                        </h1>
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
              <TabPanel className='bg-[#FBF7F5] rounded-b-lg rounded-tr-lg'>
                <div className='p-4 flex flex-col gap-5 min-h-[420px]'>
                  <h1 className='satoshi-regular font-bold text-4xl text-black'>
                    My Links
                  </h1>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full bg-[#FBF7F5] shadow-md rounded-xl border-2 border-[#E3E3E3]'>
                      <thead>
                        <tr className='text-black satoshi-regular text-xs bg-[#FBF7F5]'>
                          <th className='py-3 px-4 text-left'>Shorted Link</th>
                          <th className='py-3 px-4 text-left'>Original Link</th>
                          <th className='py-3 px-4 text-left'>Clicks</th>
                          <th className='py-3 px-4 text-left'>Status</th>
                        </tr>
                      </thead>
                      <tbody className='text-blue-gray-900 text-[#452B1A] font-bold text-xs'>
                        {Array.isArray(links) &&
                          links.map((link, index) => (
                            <tr
                              key={index}
                              className='border-b border-[#E3E3E3]'
                            >
                              <td className='py-3 px-4 max-w-[100px] overflow-scroll'>
                                <div className='whitespace-nowrap overflow-scroll'>
                                  {link.shortUrl}
                                </div>
                              </td>
                              <td className='py-3 px-4 max-w-[100px] overflow-scroll'>
                                <div className='whitespace-nowrap overflow-scroll'>
                                  {link.originalUrl}
                                </div>
                              </td>
                              <td className='py-3 px-4'>{link.clicks}</td>
                              <td className='py-3 px-4'>{link.state}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          )}
        </section>
      </main>
    </>
  );
}

export default Application;
