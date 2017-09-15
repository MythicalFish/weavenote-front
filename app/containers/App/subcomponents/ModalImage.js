import React, { PropTypes } from 'react';
import Modal from 'components/Modal';
import Image from 'components/Image';
import ImageForm from 'containers/ImageForm';

const ModalImage = ({ image }) => (
  <Modal id="image">
    {image && (
      <div className="lh0">
        <Image src={image.getIn(['urls', 'medium'])} />
        <ImageForm
          initialValues={image}
          imgID={image.get('id')}
          enableReinitialize
          disablePrimary
        />
      </div>
    )}
  </Modal>
);

ModalImage.propTypes = {
  image: PropTypes.object,
};

export default ModalImage;
