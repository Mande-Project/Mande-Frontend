import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  //
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await checkAuthenticated(access);
  //       const isAuthenticated = useAuthStore.getState().isAuthenticated;
  //     };
  //
  //     fetchData();
  //   }, [router]);

  useEffect(() => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    setIsAuthenticatedUser(isAuthenticated);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return <>{isAuthenticatedUser ? <>{children}</> : null}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
