import React, { PropTypes } from 'react';
import Modal from 'components/Modal';
import ImageForm from 'containers/ImageForm';

const ModalImage = ({ image }) => (
  <Modal id="image">
    <div className="lh0">
      {image && <ImageForm initialValues={image} imgID={image.get('id')} />}
    </div>
  </Modal>
);

ModalImage.propTypes = {
  image: PropTypes.object,
};

export default ModalImage;
