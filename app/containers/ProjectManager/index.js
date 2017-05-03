import React from 'react';
import * as sections from 'containers/ProjectsPage/constants/sections';
import SubHeader from 'components/SubHeader';
import Navigation from './Navigation';
import Basics from './Basics';
import Materials from './Materials';
import Measurements from './Measurements';

class ProjectManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { currentSection } = this.props;
    let renderedSection = <Basics {...this.props} />;

    switch (currentSection.id) {

      case sections.Materials.id:
        renderedSection = <Materials {...this.props} />;
        break;

      case sections.Measurements.id:
        renderedSection = <Measurements {...this.props} />;
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
};

export default ProjectManager;
