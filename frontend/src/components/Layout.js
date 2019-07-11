import React from 'react';
import PropTypes from 'prop-types';

import './Layout.css';

const Layout = ({ logo, toolbar, sidebar, children, footer }) => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">{logo}</div>
        <nav className="toolbar">{toolbar}</nav>
      </header>
      <nav className="sidebar">{sidebar}</nav>
      <main className="main">
        <div className="content">{children}</div>
      </main>
      {footer && <footer className="footer">Footer</footer>}
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
