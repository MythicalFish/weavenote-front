import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ThumbnailList from './subcomponents/ThumbnailList';
import ImageForm from './subcomponents/ImageForm';
import { createImage, switchImage, fetchImages } from './actions';

class ImageManager extends React.Component {
  componentDidMount() {
    // this.props.fetchImages(this.props.imageable);
  }
  render() {
    const { images, maxImages, currentImage } = this.props;
    return (
      <div>
        {currentImage.id &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <img
              src={currentImage.urls.medium}
              role="presentation"
              className="x-max20"
            />
          </div>}
        {images &&
          maxImages > 1 &&
          <div className="pt1">
            <ThumbnailList {...this.props} />
          </div>}
      </div>
    );
  }
}

ImageManager.propTypes = {
  imageable: PropTypes.object,
  images: PropTypes.object,
  currentImage: PropTypes.object,
  placeholder: PropTypes.string,
  fetchImages: PropTypes.func,
  maxImages: PropTypes.number,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchImages,
      createImage,
      switchImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ImageManager);
