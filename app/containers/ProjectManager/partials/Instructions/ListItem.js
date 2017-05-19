import React, { PropTypes } from 'react';
import AccordionItem from 'components/AccordionItem';

const ListItem = (props) => (
  <AccordionItem {...props}>
    <div>
      {props.item.get('title')}
    </div>
  </AccordionItem>
);

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
