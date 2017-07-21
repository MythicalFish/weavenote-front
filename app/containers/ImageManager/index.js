import React, { PropTypes } from 'react';
import Image from 'components/Image';
import ThumbnailList from './ThumbnailList';
import ImageForm from './ImageForm';

class ImageManager extends React.PureComponent {
  render() {
    const { currentImage, placeholder, imageable } = this.props;
    const modalID = `${imageable.type}Image`;

    return (
      <div>
        {!currentImage && placeholder && <Image src={placeholder} />}
        {currentImage &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <Image src={currentImage.getIn(['urls', 'medium'])} />
          </div>}
        <div className="pt1">
          <ThumbnailList {...this.props} id={modalID} />
        </div>
      </div>
    );
  }
}

ImageManager.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  imageable: PropTypes.object,
  placeholder: PropTypes.string,
  maxImages: PropTypes.number,
  type: PropTypes.string,
};

export default ImageManager;
