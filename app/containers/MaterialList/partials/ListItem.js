import React from 'react';
import ListItemWrapper from 'components/ListItemWrapper';
import Price from 'components/Price';

export default function ListItem(props) {
  const material = props.material.toJS();
  const url = `/materials/${material.id}`;
  return (
    <ListItemWrapper url={url}>
      <div className="p1 pr2">
        {material.type.name}
      </div>
      <div className="p1 pr2">
        {material.identifier}
      </div>
      <div className="p1 pr2">
        {material.name}
      </div>
      <div className="p1 pr2">
        <div className="dot mr1" style={{ backgroundColor: material.color.hex_code }}></div>
        {material.color.name}
      </div>
      <div className="p1 pr2">
        <Price value={material.cost_total} currency={material.currency.iso_code} />
      </div>
    </ListItemWrapper>
  );
}

ListItem.propTypes = {
  material: React.PropTypes.object.isRequired,
};
