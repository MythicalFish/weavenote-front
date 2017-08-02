import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'containers/Focusable';

function MeasurementNameLabel(props) {
  const { name, Input, inputName, submitForm } = props;
  const { doThis, isDoing, focusThis, focusClass, isFocused } = props;

  const annotate = () => {
    props.addAnnotation({
      maxAnchors: 2,
      annotatable: { type: 'MeasurementName', id: name.get('id') },
      type: 'line',
    });
  };

  const Label = () => {
    const value = name.get('value');
    if (isFocused) {
      return (
        <Dropdown value={{ name: value }}>
          <button onClick={doThis('rename')}>Rename</button>
          <button onClick={annotate}>Annotate</button>
          <button onClick={() => props.doDelete(name.get('id'))}>Remove</button>
        </Dropdown>
      );
    }
    return (
      <button onClick={focusThis}>
        {value}
      </button>
    );
  };

  const Rename = () => <Input name={inputName} onBlur={submitForm} />;

  return (
    <div className={`column-cell ${focusClass}`}>
      {isDoing('rename') ? <Rename /> : <Label />}
    </div>
  );
}
const PT = PropTypes;
MeasurementNameLabel.propTypes = {
  name: PT.object,
  submitForm: PropTypes.func,
  isDoing: PropTypes.func,
  focusThis: PropTypes.func,
  doThis: PropTypes.func,
  focusClass: PropTypes.string,
  inputName: PropTypes.string,
  Input: PropTypes.func,
  addAnnotation: PropTypes.func,
  doDelete: PropTypes.func,
  isFocused: PT.bool,
};

export default Focusable(MeasurementNameLabel);
