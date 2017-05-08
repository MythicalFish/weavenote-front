import React from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';

export default function Toolbar(props) {
  const { create, fetch, changeSection, currentSection } = props;
  return (
    <header className="toolbar">
      <button className="glyph" onClick={() => { create(); }}>
        <i className="fa fa-plus-circle"></i>
      </button>
      <nav>
        <ul>
          <li>
            <NavItem
              label={sections.ActiveProjects.label}
              isActive={currentSection.id === sections.ActiveProjects.id}
              handleClick={() => {
                fetch();
                changeSection(sections.ActiveProjects);
              }}
            />
          </li>
          <li>
            <NavItem
              label={sections.ArchivedProjects.label}
              isActive={currentSection.id === sections.ArchivedProjects.id}
              handleClick={() => {
                fetch({ archived: true });
                changeSection(sections.ArchivedProjects);
              }}
            />
          </li>
        </ul>
      </nav>
      <div>
      </div>
    </header>
  );
}

Toolbar.propTypes = {
  fetch: React.PropTypes.func,
  create: React.PropTypes.func,
  changeSection: React.PropTypes.func,
  currentSection: React.PropTypes.object,
};
