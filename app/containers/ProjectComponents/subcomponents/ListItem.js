import React, { PropTypes } from 'react';
import ListItemLabel from './ListItemLabel';

const ListItem = (props) => {
  const material = props.item.get('material');
  return <ListItemLabel material={material} />;
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
