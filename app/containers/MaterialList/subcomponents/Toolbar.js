import React from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';
import PlusButton from 'components/PlusButton';

export default function Toolbar(props) {
  const { fetch, changeSection, currentSection } = props;
  return (
    <header className="toolbar toolbar-compact container-narrow px2">
      <div className="row">
        <div className="col-xs-2">
          <PlusButton to="/materials/new" />
        </div>
        <div className="col-xs-8 flex justify-center">
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
        </div>
        <div className="col-xs-2" />
      </div>
    </header>
  );
}

Toolbar.propTypes = {
  fetch: React.PropTypes.func,
  changeSection: React.PropTypes.func,
  currentSection: React.PropTypes.object,
};
