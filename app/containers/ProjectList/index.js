import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection, selectAbilities } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import Header from 'components/Header';
import Toolbar from './subcomponents/Toolbar';
import ListItem from './subcomponents/ListItem';
import { fetchProjects, createProject, fileProject } from './actions';
import { selectProjectsList } from './selectors';

export class ProjectList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchProjects();
    this.props.changeSection(sections.ActiveProjects);
  }
  render() {
    const { props } = this;
    return (
      <div>
        <Header />
        <Toolbar {...props} />
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
  abilities: PropTypes.object,
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
  abilities: selectAbilities(),
});

export default connect(mapState, mapDispatch)(ProjectList);
