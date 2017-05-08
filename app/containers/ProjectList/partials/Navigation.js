import React from 'react';
import * as sections from 'containers/App/constants/sections';
import ProjectNavItem from 'components/ProjectNavItem';

export default function Navigation(props) {
  const { create, fetch } = props;
  return (
    <div className="flex justify-between">
      <div className="flex items-center px3">
        <button className="glyph" onClick={() => { create(); }}>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
      <nav className="tabs">
        <ul>
          <li>
            <ProjectNavItem target={sections.Active} handleDispatch={() => { fetch(); }} />
          </li>
          <li>
            <ProjectNavItem target={sections.Archived} handleDispatch={() => { fetch({ archived: true }); }} />
          </li>
        </ul>
      </nav>
      <div>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  fetch: React.PropTypes.func,
  create: React.PropTypes.func,
};
