import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const RowHeader = ({ item, Chevron, ToggleArea, deleteInstruction }) => (
  <div className="accordion-row-header">
    <ToggleArea>
      <div className="pr1 flex-auto">{item.get('title')}</div>
      <Chevron />
    </ToggleArea>
    <Dropdown icon="more">
      {deleteInstruction && (
        <button onClick={() => deleteInstruction({ ...item.toJS() })}>
          Delete
        </button>
      )}
    </Dropdown>
  </div>
);

RowHeader.propTypes = {
  item: PropTypes.object,
  Chevron: PropTypes.func,
  ToggleArea: PropTypes.func,
  deleteInstruction: PropTypes.func,
};

export default RowHeader;
