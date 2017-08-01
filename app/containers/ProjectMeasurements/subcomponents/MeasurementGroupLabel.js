import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const MeasurementGroupLabel = ({ group, rename }) =>
  <Dropdown label={group.get('name')}>
    <button onClick={rename}>Rename</button>
  </Dropdown>;

MeasurementGroupLabel.propTypes = {
  rename: PropTypes.func,
  group: PropTypes.object,
};

export default MeasurementGroupLabel;
