import React from 'react';
import { Link, browserHistory } from 'react-router';
import Price from 'components/Price';
import Dot from 'components/Dot';

export default function ListItem({ material }) {
  const url = `/materials/${material.get('id')}`;
  const linked = {
    onClick: () => browserHistory.push(url),
    className: 'cursor-pointer',
  };
  return (
    <tr>
      <td {...linked}>
        {material.getIn(['type', 'name'])}
      </td>
      <td {...linked}>
        {material.get('identifier')}
      </td>
      <td {...linked}>
        {material.get('name')}
      </td>
      <td {...linked}>
        <Dot color={material.getIn(['color', 'hex_code'])} className="mr1" />
        {material.getIn(['color', 'name'])}
      </td>
      <td />
      <td {...linked}>
        <Price
          value={material.get('cost_total')}
          currency={material.getIn(['currency', 'iso_code'])}
        />
      </td>
      <td />
      <td />
    </tr>
  );
}

ListItem.propTypes = {
  material: React.PropTypes.object.isRequired,
};
