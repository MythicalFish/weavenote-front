import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Thumbnail from 'components/Thumbnail';
import { openImage } from 'containers/App/actions';

const ImageThumbnails = (props) => {
  const { images, currentImage } = props;
  const thumbnails = [];
  const size = props.size || 'tiny';
  images.forEach((image, index) => {
    const count = index + 1;
    if (count > props.maxImages) return;
    const tid = image.get('id');
    const isCurrent = currentImage && currentImage.get('id') === tid;
    const tnProps = {
      key: `thumbnail-${tid}`,
    };
    if (isCurrent) {
      tnProps.className = 'current';
    }
    thumbnails.push(
      <li {...tnProps}>
        <button
          type="button"
          onClick={() => {
            if (props.onSelect) {
              props.onSelect(index);
            } else {
              props.openImage(image);
            }
          }}
        >
          <Thumbnail url={image.getIn(['urls', size])} size={size} />
        </button>
      </li>
    );
  });
  return (
    <div>
      <ul className="thumbnails">
        {thumbnails}
      </ul>
    </div>
  );
};

ImageThumbnails.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  maxImages: PropTypes.number,
  size: PropTypes.string,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openImage,
    },
    dispatch
  );
}

export default connect(null, mapDispatch)(ImageThumbnails);
