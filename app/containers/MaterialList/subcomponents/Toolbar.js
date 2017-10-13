import React, { PropTypes } from 'react';
import NavItem from 'components/NavItem';
import Button from 'components/Button';

export default function Toolbar(props) {
  const { fetch, changeView, currentView } = props;
  const Nav = ({ name, params }) => (
    <NavItem
      label={name}
      isActive={currentView === name}
      handleClick={() => {
        fetch(params);
        changeView(name);
      }}
    />
  );
  return (
    <header className="toolbar toolbar-compact container-narrow px2 mb4">
      <div className="row">
        <div className="col-xs-2">
          <Button to="/materials/new" label="New Material" icon="Plus" />
        </div>
        <div className="col-xs-8 flex justify-center">
          <nav>
            <ul>
              <li>
                <Nav name="Materials" />
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
  fetch: PropTypes.func,
  changeView: PropTypes.func,
  currentView: PropTypes.string,
};
