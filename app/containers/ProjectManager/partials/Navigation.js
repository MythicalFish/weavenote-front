import React, { PropTypes } from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';

export default function Navigation(props) {
  const { changeSection, currentSection } = props;
  return (
    <nav className="tabs">
      <ul>
        <li>
          <NavItem
            label={sections.Basics.label}
            isActive={sections.Basics.id === currentSection.id}
            handleClick={() => {
              changeSection(sections.Basics);
            }}
          />
        </li>
        <li>
          <NavItem
            label={sections.Components.label}
            isActive={sections.Components.id === currentSection.id}
            handleClick={() => {
              changeSection(sections.Components);
            }}
          />
        </li>
        <li>
          <NavItem
            label={sections.Measurements.label}
            isActive={sections.Measurements.id === currentSection.id}
            handleClick={() => {
              changeSection(sections.Measurements);
            }}
          />
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  changeSection: PropTypes.func,
  currentSection: PropTypes.object,
};
