import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const SidebarSection = ({ section, items }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar__section">
      <h5 className="sidebar__section__title" onClick={() => setOpen(!open)}>{section}</h5>
      <ul
        className={`sidebar__section__items ${
          open ? '' : 'sidebar__section__items--closed'
        }`}
      >
        {items.map(({ link, text, ...rest }, i) => (
          <li key={i} className="sidebar__section__item">
            <a href={link} {...rest}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

SidebarSection.propTypes = {
  section: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

const Sidebar = ({ items, header, ...props }) => {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`sidebar ${open ? '' : 'sidebar--closed'}`} {...props}>
      <div className="sidebar__header">
        {header}
        <button className="sidebar__button" onClick={() => setOpen(!open)}>
          x
        </button>
      </div>
      <div className="sidebar__content">
        {items.map((item, i) => (
          <SidebarSection key={i} {...item} />
        ))}
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  header: PropTypes.node,
};

export default Sidebar;
