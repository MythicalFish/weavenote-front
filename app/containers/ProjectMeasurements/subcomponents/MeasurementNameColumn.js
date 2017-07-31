import React, { PropTypes } from 'react';
import MeasurementNameLabel from './MeasurementNameLabel';

const MeasurementNameColumn = ({ values }) => {
  const fieldName = (i) => `names[${i}].name`;
  return (
    <div className="column">
      <label>Description</label>
      {values.map((value, index) =>
        <MeasurementNameLabel
          fieldName={fieldName(index)}
          key={fieldName(index)}
        />
      )}
    </div>
  );
};

MeasurementNameColumn.propTypes = {
  values: PropTypes.object,
};

export default MeasurementNameColumn;
