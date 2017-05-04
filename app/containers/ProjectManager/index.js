import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubHeader from 'components/SubHeader';
import Navigation from './sections/Navigation';
import BasicsForm from './sections/BasicsForm';
import Components from './sections/Components';
import Measurements from './sections/Measurements';
import { selectProject } from './selectors';
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
    const { project, currentSection, dispatch } = this.props;
    const sectionProps = {
      project,
    };

    let renderedSection = <BasicsForm {...sectionProps} />;

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
        <SubHeader>
          <Navigation handleClick={(section) => { dispatch(changeSection(section)); }} />
        </SubHeader>
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-7 flex justify-center">
                <div>
                  {project &&
                    <ImageInterface project={project} />
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
  project: React.PropTypes.object,
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
  project: selectProject(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
