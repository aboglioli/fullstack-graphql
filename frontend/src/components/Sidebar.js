import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ items, ...props }) => {
  // const [state, setState] = useState('open');
  // const openClose = () => setState(state === 'open' ? 'close' : 'open');

  return (
    <nav className="sidebar" {...props}>
      {items.map((item, i) => (
        <div key={i} className="sidebar__section">
          <h5 className="sidebar__section__title">{item.section}</h5>
          <ul className="sidebar__section__items">
            {item.items.map(({ link, text, ...rest }, i) => (
              <li key={i} className="sidebar__section__item">
                <a href={link} {...rest}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Sidebar;
