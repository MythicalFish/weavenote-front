import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Thumbnail from 'components/Thumbnail';
import Modal from 'components/Modal';
import Image from 'components/Image';
import { openModal } from 'containers/App/actions';
import ImageUploader from './ImageUploader';
import { switchImage } from './actions';
import { selectModalImage } from './selectors';

function ThumbnailList(props) {
  const { images, currentImage, type, id, modalImage } = props;
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
            if (type === 'modal') props.openModal(id);
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
    <div>
      <ul className="thumbnails">
        {thumbnails}
        {images.size < props.maxImages &&
          props.allowEdit &&
          props.showUploader &&
          <li>
            <ImageUploader {...props} />
          </li>}
      </ul>
      <Modal modalID={id}>
        <div className="lh0">
          {modalImage && <Image src={modalImage.getIn(['urls', 'large'])} />}
        </div>
      </Modal>
    </div>
  );
}

ThumbnailList.propTypes = {
  modalImage: PropTypes.object,
  images: PropTypes.object,
  currentImage: PropTypes.object,
  maxImages: PropTypes.number,
  type: PropTypes.string,
  id: PropTypes.string,
  allowEdit: PropTypes.bool,
  showUploader: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openModal,
      switchImage,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  modalImage: selectModalImage(),
});

export default connect(mapState, mapDispatch)(ThumbnailList);
