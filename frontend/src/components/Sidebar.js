import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ items, open, header, ...props }) => {
  return (
    <nav className={`sidebar ${open ? '' : 'sidebar--closed'}`} {...props}>
      <div className="sidebar__header">
        {header}
      </div>
      <div className="sidebar__content">
        {items.map((item, i) => (
          <div key={i} className="sidebar__section">
            <h5 className="sidebar__section__title">{item.section}</h5>
            <ul className="sidebar__section__items">
              {item.items.map(({ link, text, ...rest }, i) => (
                <li key={i} className="sidebar__section__item">
                  <a href={link} {...rest}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  open: PropTypes.bool,
  header: PropTypes.node,
};

Sidebar.defaultProps = {
  open: true,
};

export default Sidebar;
