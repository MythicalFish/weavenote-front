import { createConfirmation } from 'react-confirm';
import ModalConfirm from 'components/ModalConfirm';

const confirm = createConfirmation(ModalConfirm);

export default function (confirmation, options = {}) {
  return confirm({ confirmation, options });
}
