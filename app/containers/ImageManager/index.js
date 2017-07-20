import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ThumbnailList from './subcomponents/ThumbnailList';
import ImageForm from './subcomponents/ImageForm';
import Uploader from './subcomponents/Uploader';
import { createImage, switchImage } from './actions';

class ImageManager extends React.Component {
  render() {
    const {
      images,
      maxImages,
      currentImage,
      placeholder,
      useModal,
      allowEdit,
    } = this.props;
    const Image = (props) =>
      <img src={props.src} role="presentation" className="x-max20" />;
    return (
      <div>
        {!useModal &&
          <div>
            {!currentImage && placeholder && <Image src={placeholder} />}
            {currentImage &&
              <div>
                <ImageForm initialValues={currentImage} {...this.props} />
                <Image src={currentImage.getIn(['urls', 'medium'])} />
              </div>}
          </div>}
        {images &&
          maxImages > 1 &&
          <div className="pt1">
            <ThumbnailList {...this.props} />
          </div>}
        {maxImages === 1 && allowEdit && <Uploader {...this.props} />}
      </div>
    );
  }
}

ImageManager.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  placeholder: PropTypes.string,
  maxImages: PropTypes.number,
  useModal: PropTypes.bool,
  allowEdit: PropTypes.bool,
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
