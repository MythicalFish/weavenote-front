import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import I from './Input';

const Input = (props) => <I {...props} maxLength={25} placeholder="Untitled" />;

const MeasurementNameLabel = SortableElement((props) => {
  const { name, inputName, submitForm } = props;
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
        <Input name={inputName} onBlur={submitForm} value={name.value} />
      </div>
    </div>
  );
});

MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  submitForm: PropTypes.func,
  deleteName: PropTypes.func,
  inputName: PropTypes.string,
  Input: PropTypes.func,
};

export default MeasurementNameLabel;
