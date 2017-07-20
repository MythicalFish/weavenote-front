import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import { openModal } from 'containers/App/actions';
import ThumbnailList from './subcomponents/ThumbnailList';
import ImageForm from './subcomponents/ImageForm';
import Uploader from './subcomponents/Uploader';
import { createImage, switchImage } from './actions';
import { selectModalImage } from './selectors';

class ImageManager extends React.Component {
  render() {
    const {
      images,
      maxImages,
      currentImage,
      modalImage,
      placeholder,
      useModal,
      allowEdit,
      imageable,
    } = this.props;
    const modalID = `${imageable.type}Image`;
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
            <ThumbnailList {...this.props} modalID={modalID} />
          </div>}
        {maxImages === 1 && allowEdit && <Uploader {...this.props} />}
        <Modal modalID={modalID}>
          {modalImage && <Image src={modalImage.getIn(['urls', 'large'])} />}
        </Modal>
      </div>
    );
  }
}

ImageManager.propTypes = {
  images: PropTypes.object,
  currentImage: PropTypes.object,
  modalImage: PropTypes.object,
  imageable: PropTypes.object,
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
      openModal,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  modalImage: selectModalImage(),
});

export default connect(mapState, mapDispatch)(ImageManager);
