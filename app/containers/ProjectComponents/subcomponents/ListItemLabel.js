import React, { PropTypes } from 'react';
import Dot from 'components/Dot';

const ListItemLabel = ({ material }) =>
  <div className="flex justify-between x-fill">
    <div className="flex-auto pr1">
      {material.get('name')}
    </div>
    <div className="flex-none pr1">
      {material.getIn(['color', 'name'])}
      <Dot className="ml1" color={material.getIn(['color', 'hex_code'])} />
    </div>
    <div className="flex-none pr1">
      {material.getIn(['type', 'name'])}
    </div>
  </div>;

ListItemLabel.propTypes = {
  material: PropTypes.object,
};

export default ListItemLabel;
