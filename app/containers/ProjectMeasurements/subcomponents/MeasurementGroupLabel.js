import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const MeasurementGroupLabel = ({ group, doThis }) =>
  <Dropdown label={group.get('name')}>
    <button onClick={doThis('rename')}>Rename</button>
  </Dropdown>;

MeasurementGroupLabel.propTypes = {
  doThis: PropTypes.func,
  group: PropTypes.object,
};

export default MeasurementGroupLabel;
