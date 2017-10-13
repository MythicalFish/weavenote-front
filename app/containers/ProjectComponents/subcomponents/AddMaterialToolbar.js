import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import { VIEW } from '../constants';

export default function AddMaterialToolbar(props) {
  const { changeView, currentView } = props;
  const Nav = ({ name }) => (
    <li>
      <NavItem
        label={name}
        isActive={currentView === name}
        handleClick={() => changeView(name)}
      />
    </li>
  );
  Nav.propTypes = {
    name: PropTypes.string,
  };
  return (
    <header className="toolbar toolbar-compact flex justify-center">
      <nav className="">
        <ul>
          {currentView === VIEW.edit ? (
            <Nav name={VIEW.edit} />
          ) : (
            [
              <Nav name={VIEW.list} key="list" />,
              <Nav name={VIEW.create} key="create" />,
            ]
          )}
        </ul>
      </nav>
    </header>
  );
}

AddMaterialToolbar.propTypes = {
  changeView: PropTypes.func,
  currentView: PropTypes.string,
};
