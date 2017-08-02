import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const { initialValues, addAnnotation } = props;
  return (
    <form onSubmit={props.handleSubmit} id="measurements" className="flex">
      <MeasurementNameColumn
        {...{
          names: initialValues.get('names'),
          submitForm: props.onSubmit,
          addAnnotation,
        }}
      />
      {initialValues.get('groups').map((group, index) =>
        <MeasurementGroupColumn
          {...{
            key: group,
            group,
            index,
            initialValues,
            submitForm: props.onSubmit,
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
  addAnnotation: PropTypes.func,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
