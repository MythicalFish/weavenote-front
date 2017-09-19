import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';

const MeasurementNameLabel = SortableElement((props) => {
  const { name, Input, inputName, submitForm } = props;
  return (
    <div className="column-cell hoverable relative">
      <DeleteButton
        resourceName="row"
        onClick={() => props.doDelete(name.get('id'))}
        className="left-of"
      />
      <div className="flex">
        <label className="handle identifier flex-none">
          {name.get('identifier')}
        </label>
        <Input name={inputName} onBlur={submitForm} />
      </div>
    </div>
  );
});

MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  submitForm: PropTypes.func,
  doDelete: PropTypes.func,
  inputName: PropTypes.string,
  Input: PropTypes.func,
};

export default MeasurementNameLabel;
