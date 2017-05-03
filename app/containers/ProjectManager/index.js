import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/ProjectList/constants/sections';
import SubHeader from 'components/SubHeader';
import Navigation from './sections/Navigation';
import Basics from './sections/Basics';
import Materials from './sections/Materials';
import Measurements from './sections/Measurements';
import {
  selectCurrentProject, makeSelectCurrentView,
  selectCurrentSection,
} from './selectors';
import { fetchProject } from './actions';

class ProjectManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchProject(params.id));
  }

  render() {
    const { currentProject, currentSection } = this.props;
    const sectionProps = {
      currentProject,
    };

    let renderedSection = <Basics {...sectionProps} />;

    switch (currentSection.id) {

      case sections.Materials.id:
        renderedSection = <Materials {...sectionProps} />;
        break;

      case sections.Measurements.id:
        renderedSection = <Measurements {...sectionProps} />;
        break;

      default:
        break; // already set
    }

    return (
      <div>
        <SubHeader>
          <Navigation onChange={(name) => { this.props.onClickNav(name); }} />
        </SubHeader>
        <div className="p2 bg-white">
          <div className="container">
            {renderedSection}
          </div>
        </div>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  currentProject: React.PropTypes.object,
  onClickNav: React.PropTypes.func,
  currentSection: React.PropTypes.object,
  currentView: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

const mapState = createStructuredSelector({
  currentProject: selectCurrentProject(),
  currentView: makeSelectCurrentView(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
