import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import Focusable from 'utils/Focusable';
import Input from './Input';
import MeasurementGroupLabel from './MeasurementGroupLabel';

class MeasurementGroupColumn extends React.PureComponent {
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
  GroupNameField = () => {
    const { index, submitForm } = this.props;
    return (
      <Field
        focus
        name={`groups[${index}].name`}
        maxLength={3}
        onBlur={submitForm}
        component={Input}
      />
    );
  };
  ValueField = ({ index }) => {
    const { submitForm } = this.props;
    return (
      <Field
        name={`values[${index}].value`}
        maxLength={5}
        onBlur={submitForm}
        component={Input}
      />
    );
  };
  render() {
    //
    const { group, index, doDelete } = this.props;
    const { doThis, isDoing, focusThis, focusClass } = this.props;
    const { GroupNameField, ValueField } = this;

    const columnClass = `column ${focusClass}`;

    return (
      <div className={columnClass} onClick={focusThis}>
        <div className="column-header">
          {isDoing('rename')
            ? <GroupNameField />
            : <MeasurementGroupLabel {...{ group, doThis, doDelete }} />}
        </div>
        {this.measurementGroupValues(group).map((i) =>
          <div className="column-cell" key={`group${index}value${i}`}>
            <ValueField index={i} />
          </div>
        )}
      </div>
    );
  }
}

MeasurementGroupColumn.propTypes = {
  initialValues: PropTypes.object,
  group: PropTypes.object,
  index: PropTypes.number,
  submitForm: PropTypes.func,
  doThis: PropTypes.func,
  isDoing: PropTypes.func,
  focusThis: PropTypes.func,
  doDelete: PropTypes.func,
  focusClass: PropTypes.string,
};

export default Focusable(MeasurementGroupColumn);
