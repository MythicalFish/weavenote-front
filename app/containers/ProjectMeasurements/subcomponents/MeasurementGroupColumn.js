import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import Focusable from 'containers/Focusable';
import Input from './Input';
import MeasurementGroupLabel from './MeasurementGroupLabel';

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
  render() {
    //
    const { group, index, submitForm: onBlur } = this.props;
    const { doThis, isDoing, focusThis, focusClass } = this.props;

    const groupFieldName = `groups[${index}].name`;
    const valueFieldName = (i) => `values[${i}].value`;
    const fProps = { component: Input, onBlur };
    const columnClass = `column ${focusClass}`;

    return (
      <div className={columnClass} onClick={focusThis}>
        <div className="column-header">
          {isDoing('rename')
            ? <Field
              {...{
                focus: true,
                name: groupFieldName,
                maxLength: 3,
                ...fProps,
              }}
            />
            : <MeasurementGroupLabel {...{ group, doThis }} />}
        </div>
        {this.measurementGroupValues(group).map((i) =>
          //
          <Field
            {...{
              name: valueFieldName(i),
              key: valueFieldName(i),
              maxLength: 5,
              ...fProps,
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
  submitForm: PropTypes.func,
};

export default Focusable(MeasurementGroupColumn);
