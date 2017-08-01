import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'containers/Focusable';

const MeasurementNameLabel = ({ name, rename }) =>
  <Dropdown label={name.get('value')}>
    <button onClick={rename}>Rename</button>
  </Dropdown>;

MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  rename: PropTypes.func,
};

export default Focusable(MeasurementNameLabel);
