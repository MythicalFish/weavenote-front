import React, { PropTypes } from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';
import { Link } from 'react-router';
import UserMenu from 'components/UserMenu';

export default function Toolbar(props) {
  const { changeSection, currentSection, toggleCollaborators } = props;
  return (
    <header className="toolbar">
      <nav>
        <ul>
          <li>
            <Link to="/projects" className="glyph glyph-sm gray">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </li>
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
          <li>
            <NavItem
              label={sections.Instructions.label}
              isActive={sections.Instructions.id === currentSection.id}
              handleClick={() => {
                changeSection(sections.Instructions);
              }}
            />
          </li>
          <li>
            <NavItem
              label={sections.Collaborators.label}
              isActive={sections.Collaborators.id === currentSection.id}
              handleClick={() => {
                toggleCollaborators();
              }}
            />
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li><UserMenu /></li>
        </ul>
      </nav>
    </header>
  );
}

Toolbar.propTypes = {
  changeSection: PropTypes.func,
  currentSection: PropTypes.object,
  toggleCollaborators: PropTypes.func,
};
