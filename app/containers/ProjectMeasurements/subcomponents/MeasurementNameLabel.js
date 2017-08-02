import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'containers/Focusable';

function MeasurementNameLabel(props) {
  const { name, Input, inputName, submitForm } = props;
  const { doThis, isDoing, focusThis, focusClass } = props;

  const annotate = () => {
    props.addAnnotation({
      maxAnchors: 2,
      annotatable: { type: 'MeasurementName', id: name.get('id') },
      type: 'line',
    });
  };

  const Label = (
    <Dropdown label={name.get('value')}>
      <button onClick={doThis('rename')}>Rename</button>
      <button onClick={annotate}>Annotate</button>
      <button onClick={() => props.doDelete(name.get('id'))}>Remove</button>
    </Dropdown>
  );

  const Rename = <Input name={inputName} onBlur={submitForm} />;

  return (
    <div onClick={focusThis} className={`column-row ${focusClass}`}>
      {isDoing('rename') ? Rename : Label}
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
  addAnnotation: PropTypes.func,
  doDelete: PropTypes.func,
};

export default Focusable(MeasurementNameLabel);
