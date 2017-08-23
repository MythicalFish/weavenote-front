import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'utils/Focusable';

class MeasurementNameLabel extends React.PureComponent {
  render() {
    const { name, Input, inputName, submitForm } = this.props;
    const { doThis, isDoing, focusClass, isFocused } = this.props;
    const annotate = () => {
      this.props.addAnnotation({
        maxAnchors: 2,
        annotatable: { type: 'MeasurementName', id: name.get('id') },
        type: 'line',
      });
    };
    const focusThis = () => {
      this.props.focusThis();
    };
    const Label = () => {
      const value = name.get('value');
      return (
        <div>
          {!isFocused &&
            <button type="button" onClick={focusThis}>
              {value}
            </button>}
          {isFocused &&
            <Dropdown value={{ name: value }} tether={false}>
              <button onClick={doThis('rename')}>Rename</button>
              <button onClick={annotate}>Annotate</button>
              <button onClick={() => this.props.doDelete(name.get('id'))}>
                Remove
              </button>
            </Dropdown>}
        </div>
      );
    };

    const Rename = () => <Input name={inputName} onBlur={submitForm} />;

    return (
      <div className={`column-cell flex ${focusClass}`}>
        <label className="identifier flex-none">
          {name.get('identifier')}
        </label>
        {isDoing('rename') ? <Rename /> : <Label />}
      </div>
    );
  }
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
  isFocused: PropTypes.bool,
};

export default Focusable(MeasurementNameLabel);
