import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Focusable from 'utils/Focusable';

class MeasurementNameLabel extends React.PureComponent {
  render() {
    const { name, Input, inputName, submitForm } = this.props;
    const { doThis, focusClass, doNothing, focusAction } = this.props;
    const value = name.get('value');
    const annotate = () => {
      this.props.addAnnotation({
        maxAnchors: 2,
        annotatable: { type: 'MeasurementName', id: name.get('id') },
        type: 'line',
      });
    };

    const Label = () => (
      <Dropdown value={{ name: value }}>
        <button onClick={() => doThis('rename')}>Rename</button>
        <button onClick={() => this.props.doDelete(name.get('id'))}>
          Remove
        </button>
      </Dropdown>
    );

    const Rename = () => (
      <Input
        name={inputName}
        onBlur={() => {
          doNothing();
          submitForm();
        }}
      />
    );

    return (
      <div className={`column-cell flex ${focusClass}`}>
        <label className="identifier flex-none">{name.get('identifier')}</label>
        {focusAction === 'rename' ? <Rename /> : <Label />}
      </div>
    );
  }
}
MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  submitForm: PropTypes.func,
  focusAction: PropTypes.string,
  doNothing: PropTypes.func,
  doThis: PropTypes.func,
  focusClass: PropTypes.string,
  inputName: PropTypes.string,
  Input: PropTypes.func,
  addAnnotation: PropTypes.func,
  doDelete: PropTypes.func,
};

export default Focusable(MeasurementNameLabel);
