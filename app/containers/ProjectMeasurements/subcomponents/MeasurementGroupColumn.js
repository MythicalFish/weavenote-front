import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import Focusable from 'utils/Focusable';
import DeleteButton from './DeleteButton';
import Input from './Input';

class MeasurementGroupColumn extends React.PureComponent {
  measurementGroupValues = (group) => {
    const { initialValues } = this.props;
    const values = [];
    initialValues.get('values').forEach((value, index) => {
      if (value.get('measurement_group_id') === group.get('id')) {
        values.push(index);
      }
    });
    return fromJS(values);
  };
  GroupNameField = () => {
    const { index, submitForm } = this.props;
    return (
      <Field
        name={`groups[${index}].name`}
        maxLength={3}
        onBlur={submitForm}
        component={Input}
        placeholder="x"
      />
    );
  };
  ValueField = ({ index }) => {
    const { submitForm } = this.props;
    return (
      <Field
        name={`values[${index}].value`}
        maxLength={8}
        onBlur={submitForm}
        component={Input}
        placeholder="0"
      />
    );
  };
  render() {
    //
    const { group, index, doDelete } = this.props;
    const { focusThis, focusClass } = this.props;
    const { GroupNameField, ValueField } = this;

    const columnClass = `column hoverable ${focusClass}`;

    return (
      <div className={columnClass} onClick={focusThis}>
        <div className="column-header relative">
          <DeleteButton
            resourceName="column"
            onClick={() => doDelete(group.get('id'))}
            className="above"
          />
          <GroupNameField />
        </div>
        {this.measurementGroupValues(group).map((i) => (
          <div className="column-cell" key={`group${index}value${i}`}>
            <ValueField index={i} />
          </div>
        ))}
      </div>
    );
  }
}

MeasurementGroupColumn.propTypes = {
  initialValues: PropTypes.object,
  group: PropTypes.object,
  index: PropTypes.number,
  submitForm: PropTypes.func,
  focusThis: PropTypes.func,
  doDelete: PropTypes.func,
  focusClass: PropTypes.string,
};

export default Focusable(MeasurementGroupColumn);
