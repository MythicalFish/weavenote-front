import React, { PropTypes } from 'react';
import ColumnValue from './ColumnValue';

const ColumnValues = (props) => {
  const { measurements, updateMeasurements, readOnly } = props;
  return (
    <div className="flex-auto scroll-y">
      <div className="flex flex-auto y-fill">
        {measurements.groups.map((group, index) => (
          <ColumnValue
            {...{
              index,
              key: `groups[${group.id}].name`,
              group,
              measurements,
              doDelete: props.deleteGroup,
              updateMeasurements,
              readOnly,
            }}
          />
        ))}
      </div>
    </div>
  );
};

ColumnValues.propTypes = {
  measurements: PropTypes.object,
  deleteGroup: PropTypes.func,
  updateMeasurements: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default ColumnValues;
