import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import UserMenu from 'components/UserMenu';
import AvatarList from 'components/AvatarList';
import Icon from 'components/Icon';

export default function Toolbar(props) {
  const { changeView, currentView, openModal, project } = props;
  const abilities = props.abilities.get('Project').toJS();
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
      className="justify-between toolbar toolbar-flex bb1"
    >
      <Icon to="/projects" color="gray" name="ArrowLeft" size={26} />
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
              {abilities.update && (
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
              readOnly={!abilities.update}
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
  abilities: PropTypes.object,
};
