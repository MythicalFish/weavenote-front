import React, { PropTypes } from 'react';
import Thumbnail from 'components/Thumbnail';
import Uploader from './Uploader';

function ThumbnailList(props) {
  const { images, currentImage } = props;
  const thumbnails = [];
  images.forEach((image, index) => {
    const tnProps = {
      key: `thumbnail-${index}`,
    };
    if (image === currentImage) {
      tnProps.className = 'current';
    }
    thumbnails.push(
      <li {...tnProps}>
        <button
          onClick={() => {
            props.switchImage(index);
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
      <li>
        <Uploader {...props} />
      </li>
    </ul>
  );
}

ThumbnailList.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
};

export default ThumbnailList;
