import React, { PropTypes } from 'react';
import AccordionItem from 'components/AccordionItem';
import ListItemLabel from './ListItemLabel';

const ListItem = (props) => {
  const material = props.item.get('material');
  return (
    <AccordionItem {...props}>
      <ListItemLabel material={material} />
    </AccordionItem>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
