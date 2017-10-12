import React, { PropTypes } from 'react';
import Modal from 'components/Modal';
import Image from 'components/Image';
import ImageForm from 'containers/ImageForm';
import DeleteButton from 'containers/ImageForm/DeleteButton';

const Form = ({ image }) => (
  <div className="mt1">
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
  <Modal id="image" noCloseOutside>
    {image && (
      <div>
        <div className="lh1 relative">
          <Image src={image.getIn(['urls', 'medium'])} className="vh-ymax75" />
          <div className="br pb2 pr2">
            <DeleteButton
              image={image}
              attributes={{
                inlineIcon: 'trash-o',
                secondary: true,
                label: 'Delete',
                small: true,
              }}
            />
          </div>
        </div>
        <Form image={image} />
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
