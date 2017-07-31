import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const { handleSubmit, initialValues } = props;

  return (
    <form onSubmit={handleSubmit} id="measurements" className="flex">
      <MeasurementNameColumn
        values={initialValues.get('names')}
        {...{ handleSubmit }}
      />
      {initialValues
        .get('groups')
        .map((group, index) =>
          <MeasurementGroupColumn
            {...{ group, index, initialValues, key: group, handleSubmit }}
          />
        )}
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
