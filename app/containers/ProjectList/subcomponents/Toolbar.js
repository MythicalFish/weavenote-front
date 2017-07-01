import React from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';
import PlusButton from 'components/PlusButton';

export default function Toolbar(props) {
  const { createProject, fetchProjects, changeSection, currentSection, abilities } = props;
  const canCreate = abilities.Project.create;
  console.log(canCreate)
  return (
    <header className="toolbar">
      {!canCreate && <div />}
      {canCreate &&
        <PlusButton onClick={() => { createProject(); }} />
      }
      <nav>
        <ul>
          <li>
            <NavItem
              label={sections.ActiveProjects.label}
              isActive={currentSection.id === sections.ActiveProjects.id}
              handleClick={() => {
                fetchProjects();
                changeSection(sections.ActiveProjects);
              }}
            />
          </li>
          <li>
            <NavItem
              label={sections.ArchivedProjects.label}
              isActive={currentSection.id === sections.ArchivedProjects.id}
              handleClick={() => {
                fetchProjects({ archived: true });
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
  fetchProjects: React.PropTypes.func,
  createProject: React.PropTypes.func,
  changeSection: React.PropTypes.func,
  currentSection: React.PropTypes.object,
  abilities: React.PropTypes.object,
};
