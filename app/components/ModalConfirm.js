import React, { PropTypes } from 'react';
import { confirmable } from 'react-confirm';
import Modal from './ModalLayout';
import Button from './Button';

const ModalConfirm = (props) => {
  const { show, proceed, cancel, confirmation, options } = props;
  return (
    <Modal isOpen={show} hideCloseButton handleClose={cancel}>
      <div className="modal-body">{confirmation}</div>
      <footer className="modal-footer right-align">
        <Button label="Cancel" secondary inline onClick={cancel} />
        <Button label="Proceed" onClick={proceed} />
      </footer>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  show: PropTypes.bool, // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func, // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func, // from confirmable. call to close the dialog with promise rejected.
  confirmation: PropTypes.string, // arguments of your confirm function
  options: PropTypes.object, // arguments of your confirm function
};

export default confirmable(ModalConfirm);
