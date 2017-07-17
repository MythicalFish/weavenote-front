import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import ProjectInstructions from 'containers/ProjectInstructions';
import ImageManager from 'containers/ImageManager';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import Comments from 'containers/Comments';
import Modal from 'components/Modal';
import Header from 'components/Header';
import Collaborators from 'containers/Collaborators';
import Toolbar from './subcomponents/Toolbar';
import Basics from './subcomponents/Basics';
import * as selectors from './selectors';
import { fetchProject } from './actions';
import { IMAGE_PLACEHOLDER } from './constants';

class ProjectManager extends React.PureComponent {
  state = { activeModal: null };

  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
    this.props.changeSection(sections.Basics);
  }

  render() {
    const { project, currentSection } = this.props;
    const id = project.get('id');
    if (!id) return null;

    let View;

    switch (currentSection.id) {
      case sections.Components.id:
        View = ProjectComponents;
        break;

      case sections.Measurements.id:
        View = ProjectMeasurements;
        break;

      case sections.Instructions.id:
        View = ProjectInstructions;
        break;

      default:
        View = Basics;
        break;
    }

    return (
      <div>
        <Header />
        <Toolbar
          changeSection={this.props.changeSection}
          currentSection={currentSection}
          parent={this}
        />
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-3">
                <Comments
                  comments={this.props.comments}
                  currentComment={this.props.currentComment}
                  commentable={{ type: 'Project', id: project.get('id') }}
                />
              </div>
              <div className="col-xs-12 col-md-5 flex justify-center">
                <div className="flex flex-column items-center lh0">
                  <ImageManager
                    maxImages={5}
                    images={project.get('images')}
                    currentImage={this.props.currentImage}
                    placeholder={IMAGE_PLACEHOLDER}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-4 flex justify-center">
                <View {...this.props} />
              </div>
            </div>
          </div>
        </div>
        <Modal parent={this} modalID="collaborators">
          <header>
            {`Collaborators for ${project.get('name')}`}
          </header>
          <Collaborators
            invitable={{ type: 'Project', id: project.get('id') }}
          />
        </Modal>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  project: React.PropTypes.object,
  comments: React.PropTypes.object,
  currentComment: React.PropTypes.object,
  currentImage: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ changeSection, fetchProject }, dispatch);
}

const mapState = createStructuredSelector({
  comments: selectors.selectComments(),
  project: selectors.selectProject(),
  currentImage: selectors.selectCurrentImage(),
  currentComment: selectors.selectCurrentComment(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
