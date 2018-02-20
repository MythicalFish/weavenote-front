import React, { PropTypes } from 'react';
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
    <header className="toolbar toolbar-compact container-narrow px2 mt4 mb4">
      <div className="row flex items-center">
        <div className="col-xs-3 flex justify-center">
          {abilities.create && (
            <Button
              onClick={() => createProject()}
              label="New Style"
              fontIcon="fa fa-plus"
              small
            />
          )}
        </div>
        <div className="col-xs-6 flex justify-center">
          <nav>
            <ul>
              <li>
                <Nav name="Active Styles" />
              </li>
              <li>
                <Nav name="Archive" params={{ archived: true }} />
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-xs-3" />
      </div>
    </header>
  );
}

Toolbar.propTypes = {
  fetchProjects: PropTypes.func,
  createProject: PropTypes.func,
  changeView: PropTypes.func,
  currentView: PropTypes.string,
  abilities: PropTypes.object,
};
