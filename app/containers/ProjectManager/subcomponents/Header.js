import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import UserMenu from 'components/UserMenu';
import AvatarList from 'components/AvatarList';
import Icon from 'components/Icon';

export default function Toolbar(props) {
  const { changeView, currentView, openModal, exportPDF, project } = props;

  const Nav = ({ name }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => changeView(name)}
    />
  );

  return (
    <header id="app-header" className="toolbar toolbar-flex blurrable bb1">
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
              <NavItem
                className="btn btn-sm btn-secondary"
                label="Invite"
                handleClick={() => openModal('collaborators')}
              />
            </div>
          </li>
          <li>
            <AvatarList
              avatars={props.avatarList}
              onClick={() => openModal('collaborators')}
              showPlusButton={false}
            />
          </li>
        </ul>
      </nav>
      <UserMenu />
    </header>
  );
}

Toolbar.propTypes = {
  changeView: PropTypes.func,
  currentView: PropTypes.string,
  avatarList: PropTypes.object,
  project: PropTypes.object,
  openModal: PropTypes.func,
};
