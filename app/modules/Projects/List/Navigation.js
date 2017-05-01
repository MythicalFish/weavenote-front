import React from 'react';
import * as sections from 'containers/Projects/constants/sections';
import ProjectNavItem from '../ProjectNavItem';

export default class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { createProject, listProjects } = this.props;
    return (
      <div className="flex justify-between">
        <div className="flex items-center px3">
          <button className="glyph" onClick={() => { createProject(); }}>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        <nav className="tabs">
          <ul>
            <li>
              <ProjectNavItem target={sections.Active} handleDispatch={() => { listProjects(); }} />
            </li>
            <li>
              <ProjectNavItem target={sections.Archived} handleDispatch={() => { listProjects({ archived: true }); }} />
            </li>
          </ul>
        </nav>
        <div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  listProjects: React.PropTypes.func,
  createProject: React.PropTypes.func,
};
