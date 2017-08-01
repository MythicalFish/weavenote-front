import React, { PropTypes } from 'react';
import MeasurementNameLabel from './MeasurementNameLabel';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, maxLength: 8, component: Input }} />;

class MeasurementNameColumn extends React.PureComponent {
  isFocused = () => !!this.props.current;
  render() {
    const { names, onBlur, onFocus, current } = this.props;
    const fieldName = (i) => `names[${i}].value`;
    const columnClass = `column${this.isFocused() ? ' focused' : ''}`;
    return (
      <div className={columnClass}>
        <div className="column-header">
          <label>Description</label>
        </div>
        {names.map((name, index) => {
          if (index !== current) {
            return (
              <MeasurementNameInput
                {...{
                  key: fieldName(index),
                  name: fieldName(index),
                  onBlur,
                }}
              />
            );
          }
          return (
            <MeasurementNameLabel
              {...{ name, onFocus, key: fieldName(index) }}
            />
          );
        })}
      </div>
    );
  }
}

MeasurementNameColumn.propTypes = {
  names: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  current: PropTypes.number,
};

export default MeasurementNameColumn;
