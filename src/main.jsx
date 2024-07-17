import React, { useState, useEffect, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

// project styles
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import App from './App';
import ErrorPage from './Errorpage';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import CreateNewUser from './CreateNewUser';
import { AuthContext } from './context';
import { initialMainState, mainReducer } from './reducers/main-reducer';

const Protected = ({ component }) => {
  const { state } = useContext(AuthContext);
  return state?.accessToken ? (
    <>
      {component}
    </>
  ) : (
    <Navigate to="/login" replace={true}/>
  );
};

function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Protected component={<App />} />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/createnewuser',
        element: <CreateNewUser />
      },
      {
        path: '*', // Fallback route for undefined paths
        element: <ErrorPage />
      }
    ]
  }
]);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialMainState);

  const auth = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
