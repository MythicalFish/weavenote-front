import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { initialize } from 'redux-form';
import Image from 'components/Image';
import ImageThumbnails from 'components/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import { focusImage } from './actions';
import { selectCurrentImage, selectImages } from './selectors';
import { isAnnotating } from '../ProjectAnnotations/selectors';
import { startAnnotation } from '../ProjectAnnotations/actions';
import ImageUI from './subcomponents/ImageUI';
import EmptyState from './subcomponents/EmptyState';

class ProjectImages extends React.PureComponent {
  selectImage = (index) => {
    const { images } = this.props;
    this.props.focusImage(index);
    const image = images.get(index);
    this.props.initialize('ImageForm', image, { form: 'ImageForm' });
  };
  render() {
    const { project, images, currentImage: image, abilities } = this.props;
    const imageable = { type: 'Project', id: project.get('id') };
    const readOnly = !abilities.getIn(['Image', 'update']);
    const canCreate = abilities.getIn(['Image', 'create']);
    return (
      <div className="lh0 px2">
        {!image && <EmptyState {...{ imageable }} />}
        {image && (
          <div className="center">
            <ImageUI {...{ image, readOnly, ...this.props }} />
          </div>
        )}
        <div className="pt3 flex justify-center blurrable">
          <ImageThumbnails
            images={images}
            onSelect={this.selectImage}
            currentImage={image}
          />
          {canCreate &&
            image && (
              <div className="ml1">
                <ImageUploader {...{ imageable }} />
              </div>
            )}
        </div>
      </div>
    );
  }
}

ProjectImages.propTypes = {
  focusImage: PropTypes.func,
  currentImage: PropTypes.object,
  images: PropTypes.object,
  project: PropTypes.object,
  initialize: PropTypes.func,
  abilities: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      initialize,
      startAnnotation,
      focusImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  currentImage: selectCurrentImage(),
  images: selectImages(),
  isAnnotating: isAnnotating(),
});

export default connect(mapState, mapDispatch)(ProjectImages);
