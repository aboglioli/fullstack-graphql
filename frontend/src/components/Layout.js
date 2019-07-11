import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Layout.css';

const Layout = ({ logo, toolbar, sidebar, children, footer }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="container">
      <header className="toolbar">
        <button className="toolbar__closebtn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        {toolbar}
      </header>
      <nav className={`sidebar ${sidebarOpen ? '' : 'sidebar--closed'}`}>
        <div className="logo">{logo}</div>
        {sidebar}
      </nav>
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
