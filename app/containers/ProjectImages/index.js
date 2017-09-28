import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { initialize } from 'redux-form';
import Image from 'components/Image';
import ImageThumbnails from 'components/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import { selectImages } from './selectors';
import { selectIsAnnotating } from '../ImageAnnotations/selectors';
import { startAnnotation } from '../ImageAnnotations/actions';
import ImageUI from './ImageUI';
import { PLACEHOLDER } from './constants';

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
    const image = images.get(this.state.currentImage);
    const imageable = { type: 'Project', id: project.get('id') };
    return (
      <div>
        {!image && <Image src={PLACEHOLDER} />}
        {image && (
          <div className="center">
            <ImageUI {...{ image, ...this.props }} />
          </div>
        )}
        <div className="pt3 flex justify-center blurrable">
          <ImageThumbnails
            images={images}
            onSelect={this.selectImage}
            currentImage={image}
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
    {
      initialize,
      startAnnotation,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  images: selectImages(),
  isAnnotating: selectIsAnnotating(),
});

export default connect(mapState, mapDispatch)(ProjectImages);
