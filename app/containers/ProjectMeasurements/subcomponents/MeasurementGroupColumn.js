import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import Input from './Input';
import MeasurementGroupLabel from './MeasurementGroupLabel';

class MeasurementGroupColumn extends React.PureComponent {
  measurementGroupValues = (group) => {
    const { initialValues } = this.props;
    const values = [];
    initialValues.get('values').forEach((value) => {
      if (value.get('measurement_group_id') === group.get('id')) {
        values.push(value);
      }
    });
    return fromJS(values);
  };
  render() {
    const { group, index, onSubmit: onBlur } = this.props;
    const valueFieldName = (i) => `values[${i}].value`;
    const groupFieldName = (i) => `groups[${i}].name`;
    return (
      <div className="column">
        <MeasurementGroupLabel
          {...{ fieldName: groupFieldName(index), onBlur }}
        />
        {this.measurementGroupValues(group).map((value, i) =>
          //
          <Field
            {...{
              name: valueFieldName(i),
              key: valueFieldName(i),
              component: Input,
              maxLength: 5,
              onBlur,
            }}
          />
        )}
      </div>
    );
  }
}

MeasurementGroupColumn.propTypes = {
  initialValues: PropTypes.object,
  group: PropTypes.object,
  index: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default MeasurementGroupColumn;
