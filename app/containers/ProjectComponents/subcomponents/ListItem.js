import React, { PropTypes } from 'react';
import ListItemLabel from './ListItemLabel';

const ListItem = ({ item, Chevron, ToggleArea }) => {
  const material = item.get('material');
  return (
    <div className="accordion-row-header">
      <ToggleArea>
        <ListItemLabel material={material} />
        <Chevron />
      </ToggleArea>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  Chevron: PropTypes.func,
  ToggleArea: PropTypes.func,
};

export default ListItem;
