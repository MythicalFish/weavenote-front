import React, { PropTypes } from 'react';
import Input from './Input';

class ColumnValue extends React.PureComponent {
  handleChange = (v) => (value) => {
    this.props.updateMeasurements({
      values: [Object.assign(v, { value })],
    });
  };
  render() {
    const { measurements, group, fieldName } = this.props;
    return (
      <div className="column center">
        {measurements.values
          .filter((value) => value.measurement_group_id === group.id)
          .map((value, i) => (
            <div
              className="column-cell"
              key={`${fieldName}[${i}][${value.id}]`}
            >
              <Input
                maxLength={16}
                placeholder="0"
                defaultValue={value.value}
                handleChange={this.handleChange(value)}
                {...this.props}
              />
            </div>
          ))}
      </div>
    );
  }
}

ColumnValue.propTypes = {
  measurements: PropTypes.object,
  group: PropTypes.object,
  fieldName: PropTypes.string,
  updateMeasurements: PropTypes.func,
};

export default ColumnValue;
