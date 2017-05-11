import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import Toolbar from './partials/Toolbar';
import Basics from './partials/Basics';
import Components from './partials/Components';
import Measurements from './partials/Measurements';
import Images from './partials/Images';
import { selectProject } from './selectors';
import { fetchProject } from './actions';

class ProjectManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
    this.props.changeSection(sections.Basics);
  }

  render() {
    const { project, currentSection } = this.props;
    const sectionProps = {
      project,
    };

    let renderedSection = <Basics {...sectionProps} />;

    switch (currentSection.id) {

      case sections.Components.id:
        renderedSection = <Components {...sectionProps} />;
        break;

      case sections.Measurements.id:
        renderedSection = <Measurements {...sectionProps} />;
        break;

      default:
        break; // already set
    }
    return (
      <div>
        <Toolbar
          changeSection={this.props.changeSection}
          currentSection={currentSection}
        />
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-7 flex justify-center">
                {project && <Images project={project} /> }
              </div>
              <div className="col-xs-12 col-md-5 flex justify-center">
                {project && renderedSection}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  project: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { changeSection, fetchProject },
    dispatch
  );
}

const mapState = createStructuredSelector({
  project: selectProject(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
