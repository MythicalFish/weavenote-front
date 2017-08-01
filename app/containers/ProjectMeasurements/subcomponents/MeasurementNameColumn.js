import React, { PropTypes } from 'react';
import MeasurementNameLabel from './MeasurementNameLabel';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, maxLength: 8, component: Input }} />;

class MeasurementNameColumn extends React.PureComponent {
  state = { isRenaming: null };
  componentDidUpdate = () => {
    if (!this.isFocused() && this.isRenaming()) {
      this.setState({ isRenaming: null });
    }
  };
  isFocused = () => !!this.props.current;
  isRenaming = (i) => this.state.isRenaming === i;
  rename = (i) => () => {
    this.setState({ isRenaming: i });
  };
  render() {
    const { names, onBlur, onFocus } = this.props;
    const fieldKey = (i) => `names[${i}].value`;
    const columnClass = `column${this.isFocused() ? ' focused' : ''}`;
    return (
      <div className={columnClass}>
        <div className="column-header">
          <label>Description</label>
        </div>
        {names.map((name, index) => {
          if (this.isRenaming(index)) {
            return (
              <MeasurementNameInput
                {...{
                  focus: true,
                  key: fieldKey(index),
                  name: fieldKey(index),
                  onBlur,
                }}
              />
            );
          }
          return (
            <MeasurementNameLabel
              {...{
                name,
                onFocus,
                key: fieldKey(index),
                rename: this.rename(index),
              }}
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
