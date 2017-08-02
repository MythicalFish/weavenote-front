import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import MeasurementNameLabel from './MeasurementNameLabel';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, focus: true, maxLength: 8, component: Input }} />;

class MeasurementNameColumn extends React.PureComponent {
  render() {
    const { names, submitForm, addAnnotation } = this.props;
    const fieldKey = (i) => `names[${i}].value`;
    return (
      <div className="column">
        <div className="column-header">
          <label>Description</label>
        </div>
        {names.map((name, index) =>
          <MeasurementNameLabel
            {...{
              name,
              submitForm,
              addAnnotation,
              Input: MeasurementNameInput,
              inputName: fieldKey(index),
              key: fieldKey(index),
            }}
          />
        )}
      </div>
    );
  }
}

MeasurementNameColumn.propTypes = {
  names: PropTypes.object,
  submitForm: PropTypes.func,
  addAnnotation: PropTypes.func,
};

export default MeasurementNameColumn;
