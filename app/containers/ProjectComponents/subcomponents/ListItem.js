import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import ListItemLabel from './ListItemLabel';

const ListItem = ({ item, Chevron, ToggleArea, deleteComponent }) => {
  const material = item.get('material');
  return (
    <div className="accordion-row-header">
      <ToggleArea>
        <ListItemLabel material={material} />
        <Chevron />
      </ToggleArea>
      <Dropdown icon="more">
        <button onClick={() => deleteComponent({ ...item.toJS() })}>
          Delete
        </button>
      </Dropdown>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  Chevron: PropTypes.func,
  deleteComponent: PropTypes.func,
  ToggleArea: PropTypes.func,
};

export default ListItem;
