import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubHeader from 'components/SubHeader';
import Navigation from './sections/Navigation';
import BasicsForm from './sections/BasicsForm';
import Materials from './sections/Materials';
import Measurements from './sections/Measurements';
import {
  selectCurrentProject,
} from './selectors';
import { selectCurrentSection } from '../App/selectors';
import { changeSection } from '../App/actions';
import * as sections from '../App/constants/sections';
import { fetchProject } from './actions';
import ImageInterface from './sections/ImageInterface';

class ProjectManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchProject(params.id));
    dispatch(changeSection(sections.Basics));
  }

  render() {
    const { currentProject, currentSection, dispatch } = this.props;
    const sectionProps = {
      currentProject,
    };

    let renderedSection = <BasicsForm {...sectionProps} />;

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
          <Navigation handleClick={(section) => { dispatch(changeSection(section)); }} />
        </SubHeader>
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-7 flex justify-center">
                <div>
                  {currentProject &&
                    <ImageInterface project={currentProject} />
                  }
                </div>
              </div>
              <div className="col-xs-12 col-md-5 flex justify-center">  
                {renderedSection}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  currentProject: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

const mapState = createStructuredSelector({
  currentProject: selectCurrentProject(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
