/*
 *
 * Projects
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubHeader from 'components/SubHeader';
import Navigation from './sections/Navigation';
import ProjectList from './sections/List';
import { selectProjectsList } from './selectors';
import { selectCurrentSection } from '../App/selectors';
import { listProjects, createProject } from './actions';
import * as sections from '../App/constants/sections';
import { changeSection } from '../App/actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
    this.props.changeSection(sections.Active);
  }
  render() {
    const p = this.props;
    return (
      <div>
        <SubHeader>
          <Navigation createProject={p.createProject} listProjects={p.listProjects} />
        </SubHeader>
        <ProjectList projectsList={p.projectsList} />
      </div>
    );
  }
}

Projects.propTypes = {
  projectsList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  currentProject: PropTypes.object,
  listProjects: PropTypes.func,
  createProject: PropTypes.func,
  currentSection: PropTypes.object,
  changeSection: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    listProjects: (params) => dispatch(listProjects(params)),
    createProject: (data) => dispatch(createProject(data)),
    changeSection: (section) => dispatch(changeSection(section)),
  };
}

const mapState = createStructuredSelector({
  projectsList: selectProjectsList(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(Projects);
