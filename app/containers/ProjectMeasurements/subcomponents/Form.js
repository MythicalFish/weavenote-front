import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const {
    initialValues,
    handleSubmit,
    onSubmit,
    focusMeasurementName,
    focusMeasurementGroup,
    unfocusMeasurements,
    currentMeasurementName,
    currentMeasurementGroup,
  } = props;
  const onBlur = () => {
    onSubmit();
    unfocusMeasurements();
  };
  return (
    <form onSubmit={handleSubmit} id="measurements" className="flex">
      <MeasurementNameColumn
        {...{
          names: initialValues.get('names'),
          current: currentMeasurementName,
          onFocus: focusMeasurementName,
          onBlur,
        }}
      />
      {initialValues.get('groups').map((group, index) =>
        <MeasurementGroupColumn
          {...{
            key: group,
            group,
            index,
            initialValues,
            onFocus: focusMeasurementGroup,
            onBlur,
            current: currentMeasurementGroup,
          }}
        />
      )}
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  focusMeasurementGroup: PropTypes.func,
  focusMeasurementName: PropTypes.func,
  unfocusMeasurements: PropTypes.func,
  currentMeasurementGroup: PropTypes.number,
  currentMeasurementName: PropTypes.number,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
