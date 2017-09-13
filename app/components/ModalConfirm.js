import React, { PropTypes } from 'react';
import { confirmable } from 'react-confirm';
import { ModalMarkup as Modal } from './Modal';
import Button from './Button';

const ModalConfirm = (props) => {
  const { show, proceed, dismiss, cancel, confirmation, options } = props;
  return (
    <Modal isOpen={show}>
      <div className="p3">{confirmation}</div>
      <footer className="bt1 p2 right-align">
        <span className="mr2">
          <Button
            label="Cancel"
            secondary
            onClick={() => cancel('arguments will be passed to the callback')}
          />
        </span>
        <Button label="Proceed" onClick={() => proceed('same as cancel')} />
      </footer>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  show: PropTypes.bool, // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func, // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func, // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func, // from confirmable. call to only close the dialog.
  confirmation: PropTypes.string, // arguments of your confirm function
  options: PropTypes.object, // arguments of your confirm function
};

export default confirmable(ModalConfirm);
