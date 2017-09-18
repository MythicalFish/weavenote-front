import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import DeleteButton from './DeleteButton';

const MeasurementNameLabel = (props) => {
  const { name, Input, inputName, submitForm } = props;
  const { focusClass, doNothing } = props;

  return (
    <div className="column-cell hoverable relative">
      <DeleteButton
        resourceName="row"
        onClick={() => props.doDelete(name.get('id'))}
        className="left-of"
      />
      <div className={`flex ${focusClass}`}>
        <label className="identifier flex-none">{name.get('identifier')}</label>
        <Input
          name={inputName}
          onBlur={() => {
            doNothing();
            submitForm();
          }}
        />
      </div>
    </div>
  );
};
MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  submitForm: PropTypes.func,
  doNothing: PropTypes.func,
  focusClass: PropTypes.string,
  inputName: PropTypes.string,
  Input: PropTypes.func,
};

export default Focusable(MeasurementNameLabel);
