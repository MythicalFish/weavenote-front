import React from 'react';
import * as sections from 'containers/App/constants/sections';
import ProjectNavItem from 'components/ProjectNavItem';

export default class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { createProject, fetchProjects } = this.props;
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
              <ProjectNavItem target={sections.Active} handleDispatch={() => { fetchProjects(); }} />
            </li>
            <li>
              <ProjectNavItem target={sections.Archived} handleDispatch={() => { fetchProjects({ archived: true }); }} />
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
  fetchProjects: React.PropTypes.func,
  createProject: React.PropTypes.func,
};
