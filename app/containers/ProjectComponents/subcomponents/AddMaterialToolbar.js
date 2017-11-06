import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import Icon from 'components/Icon';
import { VIEW } from '../constants';

export default function AddMaterialToolbar(props) {
  const { changeView, view } = props;
  const Nav = ({ name }) => (
    <li>
      <NavItem
        label={name}
        isActive={view === name}
        handleClick={() => changeView(name)}
      />
    </li>
  );
  Nav.propTypes = {
    name: PropTypes.string,
  };
  return (
    <header className="toolbar toolbar-compact flex justify-between">
      <div>
        {view === VIEW.edit && (
          <Icon
            onClick={() => changeView(VIEW.list)}
            color="gray"
            name="ArrowLeft"
            size={26}
          />
        )}
      </div>
      <nav>
        <ul>
          {view === VIEW.edit ? (
            <Nav name={VIEW.edit} />
          ) : (
            [
              <Nav name={VIEW.list} key="list" />,
              <Nav name={VIEW.create} key="create" />,
            ]
          )}
        </ul>
      </nav>
      <div />
    </header>
  );
}

AddMaterialToolbar.propTypes = {
  changeView: PropTypes.func,
  view: PropTypes.string,
};
