import React, { PropTypes } from 'react';
import Thumbnail from 'components/Thumbnail';
import Uploader from './Uploader';

function ThumbnailList(props) {
  const { images, currentImage } = props;
  const thumbnails = [];
  images.forEach((image, index) => {
    if (props.maxImages < index) return;
    const values = image.toJS();
    const tnProps = {
      key: `thumbnail-${index}`,
    };
    if (image === currentImage) {
      tnProps.className = 'current';
    }
    thumbnails.push(
      <li {...tnProps}>
        <button
          type="button"
          onClick={() => {
            props.switchImage({ index, values });
          }}
        >
          <Thumbnail url={values.urls.tiny} />
        </button>
      </li>
    );
  });
  return (
    <ul className="thumbnails">
      {thumbnails}
      {images.size < props.maxImages &&
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
};

export default ThumbnailList;
