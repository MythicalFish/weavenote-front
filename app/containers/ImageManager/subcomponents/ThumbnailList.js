import React, { PropTypes } from 'react';
import Thumbnail from 'components/Thumbnail';

function ThumbnailList(props) {
  const { handleClick, images, currentImage } = props;
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
            handleClick(index);
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
    </ul>
  );
}

ThumbnailList.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  handleClick: PropTypes.func,
};

export default ThumbnailList;
