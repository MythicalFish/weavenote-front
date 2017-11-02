import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const ListItem = (props) => {
  const {
    component,
    material,
    deleteComponent,
    openModal,
    editMaterial,
  } = props;
  const handleClick = () => {
    editMaterial(material);
    openModal('materials');
  };
  return (
    <div className="flex justify-between x-fill bb1 p2" onClick={handleClick}>
      <div className="flex-none pr1">{material.getIn(['type', 'name'])}</div>
      <div className="flex-auto pr1">{material.get('name')}</div>
      <Dropdown icon="more">
        <button onClick={() => deleteComponent({ ...component.toJS() })}>
          Delete
        </button>
      </Dropdown>
    </div>
  );
};

ListItem.propTypes = {
  editMaterial: PropTypes.func,
  openModal: PropTypes.func,
  deleteComponent: PropTypes.func,
  component: PropTypes.object,
  material: PropTypes.object,
};

export default ListItem;
