import React, { Fragment, useContext, useEffect } from 'react';
import Reports from '../reports/Reports';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Reports />
    </Fragment>
  );
};

export default Home;
