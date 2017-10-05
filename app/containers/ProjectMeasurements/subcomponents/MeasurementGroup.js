import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';

class MeasurementGroup extends React.PureComponent {
  measurementGroupValues = (group) => {
    const { measurements } = this.props;
    const values = [];
    measurements.values.forEach((value, index) => {
      if (value.measurement_group_id === group.id) {
        values.push({ value, index });
      }
    });
    return values;
  };
  GroupNameField = () => {
    const { fieldName, submitForm, group } = this.props;
    return (
      <Input
        name={fieldName}
        maxLength={3}
        onBlur={submitForm}
        placeholder="x"
        value={group.name}
      />
    );
  };
  ValueField = ({ index, value }) => {
    const { submitForm } = this.props;
    return (
      <Input
        name={`values[${index}].value`}
        maxLength={16}
        onBlur={submitForm}
        placeholder="0"
        value={value}
      />
    );
  };
  render() {
    //
    const { group, fieldName, doDelete } = this.props;
    const { GroupNameField, ValueField } = this;
    return (
      <div className="column hoverable center">
        <div className="column-header relative">
          <div className="handle-above" />
          <DeleteButton
            resourceName="column"
            onClick={() => doDelete(group.id)}
            className="above"
          />
          <GroupNameField />
        </div>
        {this.measurementGroupValues(group).map(({ value, index }) => (
          <div className="column-cell" key={`${fieldName}[${index}]`}>
            <ValueField index={index} value={value.value} />
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
};

export default SortableElement(MeasurementGroup);
