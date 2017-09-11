import React, { PropTypes } from 'react';
import ListItemLabel from './ListItemLabel';

const ListItem = ({ item, Chevron }) => {
  const material = item.get('material');
  return (
    <div>
      <div>
        <ListItemLabel material={material} />
      </div>
      <div>
        <Chevron />
      </div>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  Chevron: PropTypes.func,
};

export default ListItem;
