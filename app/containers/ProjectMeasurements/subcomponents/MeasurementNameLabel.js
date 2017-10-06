import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';

const MeasurementNameLabel = SortableElement((props) => {
  const { name, updateMeasurements } = props;
  const handleChange = (value) => {
    updateMeasurements({ names: [Object.assign(name, { value })] });
  };
  return (
    <div className="column-cell hoverable relative">
      <div className="handle-left" />
      <DeleteButton
        resourceName="row"
        onClick={() => props.deleteName(name.id)}
        className="left-of"
      />
      <div className="flex">
        <label className="identifier flex-none">{name.identifier}</label>
        <Input
          handleChange={handleChange}
          defaultValue={name.value}
          maxLength={25}
          placeholder="Untitled"
        />
      </div>
    </div>
  );
});

MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  updateMeasurements: PropTypes.func,
  deleteName: PropTypes.func,
  Input: PropTypes.func,
};

export default MeasurementNameLabel;
