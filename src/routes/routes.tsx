import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Authentication from '../pages/Authentication';
import Application from '../pages/Application';
import { useValueStore } from '../store/valueStore';

const defaultRouteNotResolved = (
  <Route path='*' element={<p className='text-black'>Path not resolved</p>} />
);

const ContentIfUserIsLogged = () => {
  return (
    <Routes>
      {defaultRouteNotResolved}
      <Route
        path='/'
        element={
          <Navigate to={`${import.meta.env.VITE_APP_BASE_URL}application`} />
        }
      />
      <Route path='/authentication' element={<Authentication />} />
      <Route path='/application' element={<Application />} />
    </Routes>
  );
};

function RouterComponent() {
  const { userToken } = useValueStore((state) => ({
    userToken: state.userToken,
  }));
  const [userIsLogged] = userToken;

  return (
    <Router basename={import.meta.env.VITE_APP_BASE_URL as string}>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to={`${import.meta.env.VITE_APP_BASE_URL}application`} />
          }
        />
        <Route
          path={`${import.meta.env.VITE_APP_BASE_URL}authentication`}
          element={
            !userIsLogged ? (
              <Authentication />
            ) : (
              <Navigate
                to={`${import.meta.env.VITE_APP_BASE_URL}application`}
              />
            )
          }
        />
        <Route
          path={'/*'}
          element={
            !userIsLogged ? (
              <Navigate
                to={`${import.meta.env.VITE_APP_BASE_URL}authentication`}
              />
            ) : (
              <ContentIfUserIsLogged />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
