import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import { VIEW } from '../constants';

const Tabs = (props) => {
  const { currentView, changeView } = props;
  const Nav = ({ name }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => {
        changeView(name);
      }}
    />
  );
  return (
    <div className="toolbar toolbar-tiny flex justify-center mb2">
      <nav>
        <ul>
          <li>
            <Nav name={VIEW.active} />
          </li>
          <li>
            <Nav name={VIEW.archived} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

Tabs.propTypes = {
  currentView: PropTypes.string,
  changeView: PropTypes.func,
};

export default Tabs;
