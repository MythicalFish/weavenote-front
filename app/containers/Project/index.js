import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/Projects/constants/sections';
import SubHeader from 'components/SubHeader';
import Navigation from './Navigation';
import Basics from './sections/Basics';
import Materials from './sections/Materials';
import Measurements from './sections/Measurements';
import {
  selectCurrentProject, selectCurrentSection,
} from '../Projects/selectors';

class Project extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnSubmit = (data) => {
    this.props.onSubmit(data);
  }
  render() {
    console.log(this);
    const p = this.props;
    let currentSection = <Basics {...p.currentProject} />;
    switch (p.currentSection.id) {
      case sections.Basics.id:
        break; // already set
      case sections.Materials.id:
        currentSection = <Materials />;
        break;
      case sections.Measurements.id:
        currentSection = <Measurements />;
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
            {currentSection}
          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  currentProject: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onClickNav: React.PropTypes.func,
  currentSection: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    listProjects: (params) => dispatch(listProjects(params)),
    createProject: (data) => dispatch(createProject(data)),
    updateProject: (data) => dispatch(updateProject(data)),
  };
}

const mapState = createStructuredSelector({
  currentProject: selectCurrentProject(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(Project);

