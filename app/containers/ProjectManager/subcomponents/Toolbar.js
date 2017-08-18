import React, { PropTypes } from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';
import UserMenu from 'components/UserMenu';
import AvatarList from 'components/AvatarList';
import Icon from 'components/Icon';

export default function Toolbar(props) {
  const { changeSection, currentSection, openModal } = props;
  return (
    <header className="toolbar toolbar-flex blurrable bb1">
      <Icon to="/projects" color="gray" name="ArrowLeft" size={26} />

      <nav>
        <ul>
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
            <AvatarList
              avatars={props.avatarList}
              onClick={() => openModal('collaborators')}
            />
          </li>
        </ul>
      </nav>
      <UserMenu />
    </header>
  );
}

Toolbar.propTypes = {
  changeSection: PropTypes.func,
  currentSection: PropTypes.object,
  avatarList: PropTypes.object,
  openModal: PropTypes.func,
};
