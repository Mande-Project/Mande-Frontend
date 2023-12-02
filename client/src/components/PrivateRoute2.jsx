import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';

const PrivateRoute2 = ({ children }) => {
  const router = useRouter();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    setIsAuthenticatedUser(isAuthenticated);
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, []);

  return <>{!isAuthenticatedUser ? <>{children}</> : null}</>;
};

PrivateRoute2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute2;
