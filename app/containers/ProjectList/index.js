import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import SubHeader from 'components/SubHeader';
import Navigation from './partials/Navigation';
import ListItem from './partials/ListItem';
import { fetchProjects, createProject, fileProject } from './actions';
import { selectProjectsList } from './selectors';

export class ProjectList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchProjects();
    this.props.changeSection(sections.Active);
  }
  render() {
    const { props } = this;
    return (
      <div>
        <SubHeader>
          <Navigation
            currentSection={props.currentSection}
            changeSection={props.changeSection}
            create={props.createProject}
            fetch={props.fetchProjects}
          />
        </SubHeader>
        <div className="p2">
          {props.projects && props.projects.map((project, index) => (
            <ListItem
              key={`project-${index}`}
              project={project}
              fileProject={props.fileProject}
            />
          ))}
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  fetchProjects: PropTypes.func,
  createProject: PropTypes.func,
  fileProject: PropTypes.func,
  changeSection: PropTypes.func,
  currentSection: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchProjects, createProject, fileProject, changeSection },
    dispatch
  );
}

const mapState = createStructuredSelector({
  projects: selectProjectsList(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectList);
