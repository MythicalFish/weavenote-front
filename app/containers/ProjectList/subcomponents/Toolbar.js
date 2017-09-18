import React from 'react';
import NavItem from 'components/NavItem';
import Button from 'components/Button';

export default function Toolbar(props) {
  const {
    createProject,
    fetchProjects,
    changeView,
    currentView,
    abilities,
  } = props;
  const canCreate = abilities.Project.create;
  const Nav = ({ name, params }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => {
        fetchProjects(params);
        changeView(name);
      }}
    />
  );
  return (
    <header className="toolbar toolbar-compact container-narrow px2">
      <div className="row">
        <div className="col-xs-2">
          {canCreate && (
            <Button
              onClick={() => createProject()}
              label="New Project"
              icon="Plus"
            />
          )}
        </div>
        <div className="col-xs-8 flex justify-center">
          <nav>
            <ul>
              <li>
                <Nav name="Active Projects" />
              </li>
              <li>
                <Nav name="Archive" params={{ archived: true }} />
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
  fetchProjects: React.PropTypes.func,
  createProject: React.PropTypes.func,
  changeView: React.PropTypes.func,
  currentView: React.PropTypes.string,
  abilities: React.PropTypes.object,
};
