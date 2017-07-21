import React, { PropTypes } from 'react';
import Thumbnail from 'components/Thumbnail';
import Uploader from './Uploader';

function ThumbnailList(props) {
  const { images, currentImage, type } = props;
  const thumbnails = [];
  images.forEach((image, index) => {
    if (props.maxImages < index) return;
    const id = image.get('id');
    const tnProps = {
      key: `thumbnail-${id}`,
    };
    if (currentImage && currentImage.get('id') === id) {
      tnProps.className = 'current';
    }
    thumbnails.push(
      <li {...tnProps}>
        <button
          type="button"
          onClick={() => {
            if (type === 'modal') props.openModal(props.modalID);
            props.switchImage({
              index,
              image,
              reducer: props.imageable.type,
            });
          }}
        >
          <Thumbnail url={image.getIn(['urls', 'tiny'])} />
        </button>
      </li>
    );
  });
  return (
    <ul className="thumbnails">
      {thumbnails}
      {images.size < props.maxImages &&
        props.allowEdit &&
        props.showUploader &&
        <li>
          <Uploader {...props} />
        </li>}
    </ul>
  );
}

ThumbnailList.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  maxImages: PropTypes.number,
  type: PropTypes.string,
  allowEdit: PropTypes.bool,
  showUploader: PropTypes.bool,
};

export default ThumbnailList;
