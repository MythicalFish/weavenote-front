import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'containers/Focusable';

function MeasurementNameLabel(props) {
  const { name, Input, inputName, submitForm } = props;
  const { doThis, isDoing, focusThis, focusClass } = props;
  return (
    <div onClick={focusThis} className={focusClass}>
      {isDoing('rename')
        ? <Input name={inputName} onBlur={submitForm} />
        : <Dropdown label={name.get('value')}>
          <button onClick={doThis('rename')}>Rename</button>
        </Dropdown>}
    </div>
  );
}
MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  submitForm: PropTypes.func,
  isDoing: PropTypes.func,
  focusThis: PropTypes.func,
  doThis: PropTypes.func,
  focusClass: PropTypes.string,
  inputName: PropTypes.string,
  Input: PropTypes.func,
};

export default Focusable(MeasurementNameLabel);
