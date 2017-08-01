import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const MeasurementGroupLabel = ({ group, rename, onFocus }) =>
  <div onClick={onFocus}>
    <Dropdown label={group.get('name')}>
      <button onClick={rename}>Rename</button>
    </Dropdown>
  </div>;

MeasurementGroupLabel.propTypes = {
  rename: PropTypes.func,
  onFocus: PropTypes.func,
  group: PropTypes.object,
};

export default MeasurementGroupLabel;
