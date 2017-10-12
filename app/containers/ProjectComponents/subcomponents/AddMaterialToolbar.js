import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import { VIEW } from '../constants';

export default function AddMaterialToolbar(props) {
  const { changeView, currentView } = props;
  const Nav = ({ name }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => changeView(name)}
    />
  );
  Nav.propTypes = {
    name: PropTypes.string,
  };
  return (
    <header className="toolbar toolbar-compact flex justify-center">
      <nav className="">
        <ul>
          <li>
            <Nav name={VIEW.list} />
          </li>
          <li>
            <Nav name={VIEW.create} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

AddMaterialToolbar.propTypes = {
  changeView: PropTypes.func,
  currentView: PropTypes.string,
};
