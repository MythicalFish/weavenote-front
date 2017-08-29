import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { initialize } from 'redux-form';
import Image from 'components/Image';
import ImageThumbnails from 'components/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import { selectCurrentComment } from 'containers/Comments/selectors';
import CurrentImage from './CurrentImage';
import { PLACEHOLDER } from './constants';
import * as selectors from './selectors';
import { setAnnotation, createAnnotation, cancelAnnotation } from './actions';

class ProjectImages extends React.PureComponent {
  state = { currentImage: null };
  componentDidMount() {
    this.selectImage(0);
  }
  selectImage = (index) => {
    const { images } = this.props;
    const image = images.get(index);
    this.setState({ currentImage: index });
    this.props.initialize('ImageForm', image, { form: 'ImageForm' });
  };
  render() {
    const { project, images } = this.props;
    const currentImage = images.get(this.state.currentImage);
    const imageable = { type: 'Project', id: project.get('id') };
    return (
      <div>
        {!currentImage && <Image src={PLACEHOLDER} />}
        {currentImage && (
          <div className="center">
            <CurrentImage {...{ currentImage, imageable, ...this.props }} />
          </div>
        )}
        <div className="pt3 flex justify-center blurrable">
          <ImageThumbnails
            images={images}
            onSelect={this.selectImage}
            {...{ currentImage }}
          />
          <div className="ml1">
            <ImageUploader {...{ imageable }} />
          </div>
        </div>
      </div>
    );
  }
}

ProjectImages.propTypes = {
  images: PropTypes.object,
  project: PropTypes.object,
  initialize: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { setAnnotation, createAnnotation, initialize, cancelAnnotation },
    dispatch
  );
}

const mapState = createStructuredSelector({
  images: selectors.selectImages(),
  newAnnotation: selectors.selectNewAnnotation(),
  currentComment: selectCurrentComment(),
});

export default connect(mapState, mapDispatch)(ProjectImages);
