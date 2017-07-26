import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { initialize } from 'redux-form';
import Image from 'components/Image';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import ImageForm from 'containers/ImageForm';
import { selectFocus } from 'containers/App/selectors';
import CurrentImage from './CurrentImage';
import { PLACEHOLDER } from './constants';
import * as selectors from './selectors';
import { setAnnotation } from './actions';

class ProjectImages extends React.PureComponent {
  state = { currentImage: null };
  componentDidMount = () => {
    this.selectImage(this.props.project.getIn(['images', '0']));
  };
  selectImage = (image) => {
    this.setState({ currentImage: image });
    this.props.initialize('ImageForm', image, { form: 'ImageForm' });
  };
  render() {
    const { project } = this.props;
    const { currentImage } = this.state;
    const imageable = { type: 'Project', id: project.get('id') };
    return (
      <div>
        {!currentImage && <Image src={PLACEHOLDER} />}
        {currentImage &&
          <div>
            <div className="blurrable">
              <ImageForm initialValues={currentImage} {...{ imageable }} />
            </div>
            <CurrentImage {...{ currentImage, ...this.props }} />
          </div>}
        <div className="pt1 flex blurrable">
          <ImageThumbnails
            images={project.get('images')}
            onSelect={this.selectImage}
            {...{ currentImage }}
          />
          <ImageUploader {...{ imageable }} />
        </div>
      </div>
    );
  }
}

ProjectImages.propTypes = {
  project: PropTypes.object,
  initialize: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ setAnnotation, initialize }, dispatch);
}

const mapState = createStructuredSelector({
  annotation: selectors.selectAnnotation(),
  focus: selectFocus(),
});

export default connect(mapState, mapDispatch)(ProjectImages);
