import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ThumbnailList from './subcomponents/ThumbnailList';
import ImageForm from './subcomponents/ImageForm';
import { createImage, switchImage } from './actions';

class ImageManager extends React.Component {
  render() {
    const { images, maxImages, currentImage, placeholder } = this.props;
    const Image = (props) =>
      <img src={props.src} role="presentation" className="x-max20" />;
    return (
      <div>
        {!currentImage.id && placeholder && <Image src={placeholder} />}
        {currentImage.id &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <Image src={currentImage.urls.medium} />
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
  images: PropTypes.object,
  currentImage: PropTypes.object,
  placeholder: PropTypes.string,
  maxImages: PropTypes.number,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      createImage,
      switchImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ImageManager);
