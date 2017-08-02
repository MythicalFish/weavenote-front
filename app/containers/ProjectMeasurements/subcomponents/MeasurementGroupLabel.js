import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

const MeasurementGroupLabel = ({ group, doThis, doDelete }) =>
  <Dropdown label={group.get('name')}>
    <button onClick={doThis('rename')}>Rename</button>
    <button onClick={() => doDelete(group.get('id'))}>Remove</button>
  </Dropdown>;

MeasurementGroupLabel.propTypes = {
  doDelete: PropTypes.func,
  doThis: PropTypes.func,
  group: PropTypes.object,
};

export default MeasurementGroupLabel;
