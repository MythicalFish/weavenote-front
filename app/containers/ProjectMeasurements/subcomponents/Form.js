import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const { initialValues, handleSubmit, onSubmit: submitForm } = props;
  return (
    <form onSubmit={handleSubmit} id="measurements" className="flex">
      <MeasurementNameColumn
        {...{
          names: initialValues.get('names'),
          submitForm,
        }}
      />
      {initialValues.get('groups').map((group, index) =>
        <MeasurementGroupColumn
          {...{
            key: group,
            group,
            index,
            initialValues,
            submitForm,
          }}
        />
      )}
      <button type="submit" className="conceal" />
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
