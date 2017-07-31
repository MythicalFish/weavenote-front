import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import Field from './Field';
import MeasurementGroupLabel from './MeasurementGroupLabel';

class MeasurementGroupColumn extends React.PureComponent {
  measurementGroupValues = (group) => {
    const { initialValues } = this.props;
    const values = [];
    initialValues.get('values').map((value) => {
      if (value.get('measurement_group_id') === group.get('id')) {
        values.push(value);
      }
    });
    return fromJS(values);
  };
  render() {
    const { group, index } = this.props;
    const groupName = (i) => `values[${i}].value`;
    return (
      <div className="column">
        <MeasurementGroupLabel fieldName={`groups[${index}].name`} />
        {this.measurementGroupValues(group).map((value, i) =>
          //
          <Field name={groupName(i)} key={groupName(i)} maxLength={5} />
        )}
      </div>
    );
  }
}

MeasurementGroupColumn.propTypes = {
  initialValues: PropTypes.object,
  group: PropTypes.object,
  index: PropTypes.number,
};

export default MeasurementGroupColumn;
