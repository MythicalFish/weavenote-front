import React, { PropTypes } from 'react';
import MeasurementNameLabel from './MeasurementNameLabel';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, maxLength: 8, component: Input }} />;

const MeasurementNameColumn = ({ values, onBlur }) => {
  const fieldName = (i) => `names[${i}].value`;
  return (
    <div className="column">
      <label>Description</label>
      {values.map((value, index) =>
        <MeasurementNameInput
          {...{
            key: fieldName(index),
            name: fieldName(index),
            onBlur,
          }}
        />
      )}
    </div>
  );
};

MeasurementNameColumn.propTypes = {
  values: PropTypes.object,
  onBlur: PropTypes.func,
};

export default MeasurementNameColumn;
