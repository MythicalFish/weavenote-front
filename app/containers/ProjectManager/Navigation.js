import React from 'react';
import * as sections from 'containers/ProjectsPage/constants/sections';
import ProjectNavItem from 'components/ProjectNavItem';

export default class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleChange() {

  }
  render() {
    return (
      <nav className="tabs">
        <ul>
          <li>
            <ProjectNavItem target={sections.Basics} handleDispatch={() => {}} />
          </li>
          <li>
            <ProjectNavItem target={sections.Materials} handleDispatch={() => {}} />
          </li>
          <li>
            <ProjectNavItem target={sections.Measurements} handleDispatch={() => {}} />
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  onChange: React.PropTypes.func,
};
