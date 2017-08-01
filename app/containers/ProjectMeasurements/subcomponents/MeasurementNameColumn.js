import React, { PropTypes } from 'react';
import MeasurementNameLabel from './MeasurementNameLabel';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, maxLength: 8, component: Input }} />;

const MeasurementNameColumn = ({ measurementNames, onSubmit }) => {
  const fieldName = (i) => `names[${i}].value`;
  return (
    <div className="column">
      <label>Description</label>
      {measurementNames.map((value, index) =>
        <MeasurementNameInput
          {...{
            key: fieldName(index),
            name: fieldName(index),
            onBlur: onSubmit,
          }}
        />
      )}
    </div>
  );
};

MeasurementNameColumn.propTypes = {
  measurementNames: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default MeasurementNameColumn;
