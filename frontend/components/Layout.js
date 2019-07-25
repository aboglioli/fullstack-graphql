import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LayoutContext from './LayoutContext';

const Layout = ({ logo, toolbar, sidebar, children, footer }) => {
  const { sidebarOpen, toggleSidebar } = useContext(LayoutContext);

  return (
    <div className="container">
      <header className="toolbar">
        <button className="toolbar__closebtn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon="bars" />
        </button>
        {toolbar}
      </header>
      <nav className={`sidebar ${sidebarOpen ? '' : 'sidebar--closed'}`}>
        <div className="logo">{logo}</div>
        {sidebar}
      </nav>
      <main className="main">
        <div className="content">{children}</div>
      </main>
      <footer className="footer">{footer}</footer>
    </div>
  );
};

Layout.propTypes = {
  logo: PropTypes.node,
  toolbar: PropTypes.node,
  sidebar: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
};

export default Layout;
