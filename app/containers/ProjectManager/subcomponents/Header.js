import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import UserMenu from 'components/UserMenu';
import AvatarList from 'components/AvatarList';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default function Toolbar(props) {
  const { changeView, currentView, openModal, project, role } = props;
  const readOnly = role.get('name') !== 'Admin';
  const Nav = ({ name }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => changeView(name)}
    />
  );

  return (
    <header
      id="app-header"
      className="justify-between toolbar toolbar-flex bb1 dark5"
    >
      <div className="px3">
        <Button
          to="/projects"
          label="Style overview"
          fontIcon="fa fa-arrow-left"
          inline
        />
      </div>
      <nav>
        <ul>
          <li>
            <Nav name="Basics" />
          </li>
          <li>
            <Nav name="Materials" />
          </li>
          <li>
            <Nav name="Measurements" />
          </li>
          <li>
            <Nav name="Instructions" />
          </li>
          <li>
            <div className="flex items-center">
              <div className="mr2">
                <NavItem
                  className="btn btn-sm"
                  label="Download"
                  handleClick={() => openModal('export')}
                />
              </div>
              {!readOnly && (
                <NavItem
                  className="btn btn-sm btn-secondary"
                  label="Invite"
                  handleClick={() => openModal('collaborators')}
                />
              )}
            </div>
          </li>
          <li>
            <AvatarList
              onClick={() => openModal('collaborators')}
              showPlusButton={false}
              readOnly={readOnly}
              {...props}
              collaborators={project.get('all_collaborators')}
            />
          </li>
        </ul>
      </nav>
      <UserMenu />
    </header>
  );
}

Toolbar.propTypes = {
  project: PropTypes.object,
  changeView: PropTypes.func,
  currentView: PropTypes.string,
  openModal: PropTypes.func,
  role: PropTypes.object,
};
