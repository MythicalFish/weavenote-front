import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import Column from './Column';

const Form = (props) => {

  const { handleSubmit, submitting, initialValues } = props;
  const groupings = [
    {
      constraint: null,
      items: initialValues.get('names').map((name, index) => {
        return { type: 'names', index, fieldType: 'text', fieldLength: '16' };
      }),
      colClass: 'column',
    },
  ];

  initialValues.get('groups').toJS().forEach((group, groupIndex) => {
    const grouping = {
      constraint: { type: 'groups', index: groupIndex },
      items: [],
      colClass: 'column',
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
      <div className="flex">
        {groupings.map((grouping, index) => (
          <div className={`${grouping.colClass}`} key={`group${index}`}>
            <Column grouping={grouping} />
          </div>
        ))}
      </div>
      <footer className="p2 center">
        <Button type="submit" disabled={submitting} label="Save" />
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
