import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarSection = ({ section, items }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar__section">
      <h5 className="sidebar__section__title" onClick={() => setOpen(!open)}>
        <span>{section}</span>
        <span>
          {open ? (
            <FontAwesomeIcon icon="chevron-circle-up" />
          ) : (
            <FontAwesomeIcon icon="chevron-circle-down" />
          )}
        </span>
      </h5>
      <ul
        className={`sidebar__section__items ${
          open ? '' : 'sidebar__section__items--closed'
        }`}
      >
        {items.map(({ link, text }, i) => (
          <li key={i} className="sidebar__section__item">
            <Link href={link}>
              <a>{text}</a>
            </Link>
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

const Sidebar = ({ items }) => {
  return items.map((item, i) => <SidebarSection key={i} {...item} />);
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Sidebar;
