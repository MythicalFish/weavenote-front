import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Thumbnail from 'components/Thumbnail';
import Dropdown from 'components/Dropdown';
import Dot from 'components/Dot';
import { openImage } from 'containers/App/actions';
import { deleteImage } from './actions';

const ImageThumbnails = (props) => {
  const { images, currentImage, imageable } = props;
  const thumbnails = [];
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
    const delImage = () => props.deleteImage({ image, imageable });
    thumbnails.push(
      <li {...tnProps}>
        <Dropdown className="thumbnail-actions" label={<Dot size={8} />}>
          <button type="button" onClick={delImage}>
            Delete
          </button>
        </Dropdown>
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
  imageable: PropTypes.object,
  currentImage: PropTypes.object,
  maxImages: PropTypes.number,
  deleteImage: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openImage,
      deleteImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ImageThumbnails);
