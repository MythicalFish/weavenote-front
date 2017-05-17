import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Column from './Column';

const Form = (props) => {

  const { handleSubmit, submitting, initialValues } = props;
  const groupings = [
    {
      constraint: null,
      items: initialValues.get('names').toJS().map((name, index) => {
        return { type: 'names', index, fieldType: 'text', fieldLength: '16' };
      }),
      colWidth: 4,
    },
  ];

  initialValues.get('groups').toJS().forEach((group, groupIndex) => {
    const grouping = {
      constraint: { type: 'groups', index: groupIndex },
      items: [],
      colWidth: 2,
    };
    initialValues.get('values').toJS().forEach((measurement, index) => {
      if (measurement.measurement_group_id === group.id) {
        grouping.items.push({ type: 'values', index });
      }
    });
    groupings.push(grouping);
  });

  return (
    <form onSubmit={handleSubmit} id="measurements">
      <div className="row">
        {groupings.map((grouping, index) => (
          <div className={`col-xs-${grouping.colWidth}`} key={`group${index}`}>
            <Column grouping={grouping} />
          </div>
        ))}
      </div>
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
