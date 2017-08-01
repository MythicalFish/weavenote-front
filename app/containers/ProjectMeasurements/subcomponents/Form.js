import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const { handleSubmit, initialValues, onSubmit } = props;
  const measurementNames = initialValues.get('names');
  const measurementGroups = initialValues.get('groups');
  return (
    <form onSubmit={handleSubmit} id="measurements" className="flex">
      <MeasurementNameColumn {...{ onSubmit, measurementNames }} />
      {measurementGroups.map((group, index) =>
        <MeasurementGroupColumn
          {...{ group, index, initialValues, key: group, onSubmit }}
        />
      )}
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
