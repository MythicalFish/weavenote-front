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
  values() {
    const { currentImage, placeholder } = this.props;
    let values;
    if (currentImage) {
      values = currentImage.toJS();
    } else {
      values = { url: placeholder || null };
    }
    values.imageable = this.props.imageable;
    return values;
  }
  render() {
    const { images, maxImages } = this.props;
    const values = this.values();
    return (
      <div>
        {values.id &&
          <div>
            <ImageForm initialValues={values} {...this.props} />
            <img
              src={values.urls.medium}
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
