import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Sidebar.scss';
import LayoutContext from './LayoutContext';

const SidebarSection = ({ section, activePathname, toggleSidebarSection }) => {
  const { section: name, items, open } = section;
  return (
    <div className="sidebar__section">
      <h5 className="sidebar__section__title" onClick={toggleSidebarSection}>
        <span>{name}</span>
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
              <a className={link === activePathname ? 'active' : ''}>{text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

SidebarSection.propTypes = {
  section: PropTypes.object.isRequired,
  activePathname: PropTypes.string.isRequired,
  toggleSidebarSection: PropTypes.func.isRequired,
};

const Sidebar = () => {
  const { sidebar, toggleSidebarSection } = useContext(LayoutContext);
  const router = useRouter();

  return sidebar.map((section, i) => (
    <SidebarSection
      key={i}
      section={section}
      activePathname={router ? router.pathname : ''}
      toggleSidebarSection={() => toggleSidebarSection(i)}
    />
  ));
};

export default Sidebar;
