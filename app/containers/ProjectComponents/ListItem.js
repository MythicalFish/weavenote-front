import React, { PropTypes } from 'react';
import AccordionItem from 'components/AccordionItem';
import Dot from 'components/Dot';

const ListItem = (props) => {
  const material = props.item.get('material').toJS();
  return (
    <AccordionItem {...props}>
      <div className="x10 pr1">
        {material.name}
      </div>
      <div className="x6 pr1">
        {material.type.name}
      </div>
      <div className="x6 pr1">
        {material.color.name}
        <Dot className="ml1" color={material.color.hex_code} />
      </div>
    </AccordionItem>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
