import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Thumbnail from 'components/Thumbnail';
import { openImage } from 'containers/App/actions';

const ImageThumbnails = (props) => {
  const { images, currentImage } = props;
  const thumbnails = [];
  images.forEach((image, index) => {
    const count = index + 1;
    if (count > props.maxImages) return;
    const tid = image.get('id');
    const tnProps = {
      key: `thumbnail-${tid}`,
    };
    if (currentImage && currentImage.get('id') === tid) {
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
          <Thumbnail url={image.getIn(['urls', 'tiny'])} />
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
  deletable: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ImageThumbnails);
