import React from 'react';
import * as sections from 'containers/Projects/constants/sections';
import SubHeader from 'components/SubHeader';
import Navigation from './Navigation';
import Basics from './sections/Basics';
import Materials from './sections/Materials';
import Measurements from './sections/Measurements';

class ShowProject extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnSubmit = (data) => {
    this.props.onSubmit(data);
  }
  render() {
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
        <div className="p2">
          {currentSection}
        </div>
      </div>
    );
  }
}

ShowProject.propTypes = {
  currentProject: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onClickNav: React.PropTypes.func,
  currentSection: React.PropTypes.object,
};

export default ShowProject;
