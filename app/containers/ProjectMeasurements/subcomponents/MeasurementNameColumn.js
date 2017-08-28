import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import MeasurementNameLabel from './MeasurementNameLabel';
import Input from './Input';

const MeasurementNameInput = (props) =>
  <Field {...{ ...props, focus: true, maxLength: 25, component: Input }} />;

class MeasurementNameColumn extends React.PureComponent {
  render() {
    const { names } = this.props;
    const lProps = { ...this.props };
    delete lProps.names;
    const fieldKey = (i) => `names[${i}].value`;
    return (
      <div className="column">
        <div className="column-header">
          <label>Description</label>
        </div>
        {names.map((name, index) =>
          <MeasurementNameLabel
            {...{
              name,
              Input: MeasurementNameInput,
              inputName: fieldKey(index),
              key: fieldKey(index),
              ...lProps,
            }}
          />
        )}
      </div>
    );
  }
}

MeasurementNameColumn.propTypes = {
  names: PropTypes.object,
};

export default MeasurementNameColumn;
