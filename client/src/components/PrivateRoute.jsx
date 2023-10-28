import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { checkAuthenticated } from '../api/auth';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const access = useAuthStore.getState().access;
      await checkAuthenticated(access);
      const isAuthenticatedR = useAuthStore.getState().isAuthenticated;
      setIsAuthenticated(isAuthenticatedR);
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return <>{isAuthenticated ? <>{children}</> : null}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
