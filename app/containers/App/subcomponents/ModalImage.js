import React, { PropTypes } from 'react';
import Modal from 'components/Modal';
import Image from 'components/Image';
import ImageForm from 'containers/ImageForm';

const Form = ({ image }) => (
  <div className="bg-white p2 mt1 rounded">
    {image && (
      <ImageForm
        initialValues={image}
        imgID={image.get('id')}
        enableReinitialize
        altTheme
      />
    )}
  </div>
);

const ModalImage = ({ image }) => (
  <Modal id="image" footer={<Form image={image} />}>
    {image && (
      <div className="lh0">
        <Image src={image.getIn(['urls', 'medium'])} className="vh-ymax75" />
      </div>
    )}
  </Modal>
);

ModalImage.propTypes = {
  image: PropTypes.object,
};

Form.propTypes = {
  image: PropTypes.object,
};

export default ModalImage;
