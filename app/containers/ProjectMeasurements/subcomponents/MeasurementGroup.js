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
    const { measurements, group, fieldName, doDelete, readOnly } = this.props;
    return (
      <div className="column hoverable center">
        <div className="column-header relative">
          {!readOnly && <div className="handle-above" />}
          {!readOnly && (
            <DeleteButton
              resourceName="column"
              onClick={() => doDelete(group.id)}
              className="above"
            />
          )}
          <Input
            maxLength={16}
            placeholder="x"
            defaultValue={group.name}
            handleChange={this.handleGroupChange}
            readOnly={readOnly}
          />
        </div>
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
                handleChange={this.handleValueChange(value)}
                readOnly={readOnly}
              />
            </div>
          ))}
      </div>
    );
  }
}

MeasurementGroup.propTypes = {
  readOnly: PropTypes.bool,
  measurements: PropTypes.object,
  group: PropTypes.object,
  fieldName: PropTypes.string,
  doDelete: PropTypes.func,
  updateMeasurements: PropTypes.func,
};

export default SortableElement(MeasurementGroup);
