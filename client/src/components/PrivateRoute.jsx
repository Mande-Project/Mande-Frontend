import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect} from 'react';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
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
