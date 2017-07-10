import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ThumbnailList from './subcomponents/ThumbnailList';
import Uploader from './subcomponents/Uploader';
import { deleteImage, createImage, switchImage, fetchImages } from './actions';

class ImageManager extends React.Component {
  componentDidMount() {
    this.props.fetchImages(this.props.imageable);
  }
  currentImage() {
    const { currentImage, placeholder } = this.props;
    if (currentImage) return currentImage.toJS();
    return { url: placeholder || null };
  }
  deleteImage = (id) => () => {
    const { imageable } = this.props;
    this.props.deleteImage({ imageable, id });
  };

  render() {
    const { images, maxImages } = this.props;
    const image = this.currentImage();
    return (
      <div>
        <div className="flex flex-column items-center">
          {image.id &&
            <div>
              <div>
                <button onClick={this.deleteImage(image.id)}>Delete</button>
              </div>
              <img
                src={image.urls.medium}
                role="presentation"
                className="x-max20"
              />
            </div>}
        </div>
        <div>
          {images &&
            maxImages > 1 &&
            <ThumbnailList
              images={images}
              handleClick={(index) => {
                this.props.switchImage(index);
              }}
            />}
        </div>
        <Uploader {...this.props} />
      </div>
    );
  }
}

ImageManager.propTypes = {
  imageable: PropTypes.object,
  images: PropTypes.object,
  currentImage: PropTypes.object,
  placeholder: PropTypes.string,
  deleteImage: PropTypes.func,
  switchImage: PropTypes.func,
  fetchImages: PropTypes.func,
  maxImages: PropTypes.number,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchImages,
      deleteImage,
      createImage,
      switchImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ImageManager);
