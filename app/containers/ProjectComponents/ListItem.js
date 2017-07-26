import React, { PropTypes } from 'react';
import AccordionItem from 'components/AccordionItem';
import Dot from 'components/Dot';

const ListItem = (props) => {
  const material = props.item.get('material');
  return (
    <AccordionItem {...props}>
      <div className="flex-auto pr1">
        {material.get('name')}
      </div>
      <div className="flex-none pr1">
        {material.getIn(['color', 'name'])}
        <Dot className="ml1" color={material.getIn(['color', 'hex_code'])} />
      </div>
    </AccordionItem>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
