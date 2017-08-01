import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import Input from './Input';
import MeasurementGroupLabel from './MeasurementGroupLabel';

class MeasurementGroupColumn extends React.PureComponent {
  state = { isRenaming: false };
  componentDidUpdate = () => {
    if (!this.isFocused() && this.isRenaming()) {
      this.setState({ isRenaming: false });
    }
  };
  measurementGroupValues = (group) => {
    const { initialValues } = this.props;
    const values = [];
    initialValues.get('values').forEach((value, index) => {
      if (value.get('measurement_group_id') === group.get('id')) {
        values.push(index);
      }
    });
    return fromJS(values);
  };
  isFocused = () => {
    const { current, index } = this.props;
    return current === index;
  };
  isRenaming = () => this.state.isRenaming;
  rename = () => {
    this.setState({ isRenaming: true });
  };
  render() {
    const { group, index, onBlur } = this.props;
    const groupFieldName = `groups[${index}].name`;
    const valueFieldName = (i) => `values[${i}].value`;
    const fProps = { component: Input, onBlur };
    const onFocus = () => this.props.onFocus(index);
    const columnClass = `column${this.isFocused() ? ' focused' : ''}`;
    const { rename } = this;
    return (
      <div className={columnClass} onClick={onFocus}>
        <div className="column-header">
          {this.isRenaming()
            ? <Field
              {...{ focus, name: groupFieldName, maxLength: 3, ...fProps }}
            />
            : <MeasurementGroupLabel {...{ group, onFocus, rename }} />}
        </div>
        {this.measurementGroupValues(group).map((i) =>
          //
          <Field
            {...{
              name: valueFieldName(i),
              key: valueFieldName(i),
              maxLength: 5,
              ...fProps,
            }}
          />
        )}
      </div>
    );
  }
}

MeasurementGroupColumn.propTypes = {
  initialValues: PropTypes.object,
  group: PropTypes.object,
  index: PropTypes.number,
  current: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default MeasurementGroupColumn;
