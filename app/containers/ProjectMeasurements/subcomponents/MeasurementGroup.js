import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';

class MeasurementGroup extends React.PureComponent {
  handleValueChange = (v) => (value) => {
    this.props.updateMeasurements({
      values: [Object.assign(v, { value })],
    });
  };
  handleGroupChange = (value) => {
    const { group } = this.props;
    this.props.updateMeasurements({
      groups: [Object.assign(group, { name: value })],
    });
  };
  render() {
    //
    const { measurements, group, fieldName, doDelete } = this.props;
    return (
      <div className="column hoverable center">
        <div className="column-header relative">
          <div className="handle-above" />
          <DeleteButton
            resourceName="column"
            onClick={() => doDelete(group.id)}
            className="above"
          />
          <Input
            maxLength={3}
            placeholder="x"
            defaultValue={group.name}
            handleChange={this.handleGroupChange}
          />
        </div>
        {measurements.values
          .filter((value) => value.measurement_group_id === group.id)
          .map((value, i) => (
            <div className="column-cell" key={`${fieldName}[${i}]`}>
              <Input
                maxLength={16}
                placeholder="0"
                defaultValue={value.value}
                handleChange={this.handleValueChange(value)}
              />
            </div>
          ))}
      </div>
    );
  }
}

MeasurementGroup.propTypes = {
  measurements: PropTypes.object,
  group: PropTypes.object,
  fieldName: PropTypes.string,
  submitForm: PropTypes.func,
  doDelete: PropTypes.func,
  updateMeasurements: PropTypes.func,
};

export default SortableElement(MeasurementGroup);
