import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { changeSection } from 'containers/App/actions';
import SubHeader from 'components/SubHeader';
import Navigation from './partials/Navigation';
import ListItem from './partials/ListItem';
import { fetchProjects, createProject } from './actions';
import { selectProjectsList } from './selectors';

export class ProjectList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetch();
    this.props.changeSection(sections.Active);
  }
  render() {
    const { projects, create, fetch } = this.props;
    return (
      <div>
        <SubHeader>
          <Navigation create={create} fetch={fetch} />
        </SubHeader>
        <div className="p2">
          {projects && projects.map((project, index) => (
            <ListItem key={`project-${index}`} project={project} />
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
  fetch: PropTypes.func,
  create: PropTypes.func,
  changeSection: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    fetch: (params) => dispatch(fetchProjects(params)),
    create: (data) => dispatch(createProject(data)),
    changeSection: (section) => dispatch(changeSection(section)),
  };
}

const mapState = createStructuredSelector({
  projects: selectProjectsList(),
});

export default connect(mapState, mapDispatch)(ProjectList);
