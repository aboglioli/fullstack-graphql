import React from 'react';
import PropTypes from 'prop-types';

// import Nav from '../components/Nav';
import Routes from '../utils/Routes';
import SideBar from '../components/SideBar';

const Dashboard = ({ routes }) => {
  return (
    <>
      <SideBar>
        <ul>
          <li>Primer link</li>
          <li>Segundo link</li>
          <li>Tercer link</li>
        </ul>
      </SideBar>
      <main>
        <Routes routes={routes} />
      </main>
    </>
  );
};

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Dashboard;
