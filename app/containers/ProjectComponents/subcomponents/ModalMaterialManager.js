import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/subcomponents/Form';
import Modal from 'components/Modal';

export default class ModalMaterialManager extends React.PureComponent {
  render() {
    const { selectMaterial } = this.props;
    return (
      <Modal id="materials" minWidth="1200px">
        <div className="p4">
          <MaterialList selectable onSelect={selectMaterial} />
        </div>
      </Modal>
    );
  }
}

ModalMaterialManager.propTypes = {
  selectMaterial: PropTypes.func,
};
