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
              label={sections.ActiveMaterials.label}
              isActive={currentSection.id === sections.ActiveMaterials.id}
              handleClick={() => {
                fetch();
                changeSection(sections.ActiveMaterials);
              }}
            />
          </li>
          <li>
            <NavItem
              label={sections.ArchivedMaterials.label}
              isActive={currentSection.id === sections.ArchivedMaterials.id}
              handleClick={() => {
                fetch({ archived: true });
                changeSection(sections.ArchivedMaterials);
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
