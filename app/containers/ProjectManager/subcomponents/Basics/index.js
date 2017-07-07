import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import { updateProject } from '../../actions';
import { selectProject } from '../../selectors';

const Basics = (props) => {
  const { handleSubmit, pristine, reset, submitting, project } = props;
  const createdOn = (
    <FormattedDate
      value={project.get('created_at')}
      day="numeric"
      month="short"
    />
  );
  return (
    <form className="data-rows" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={DataRow} label="Name" />
      <Field name="category" type="text" component={DataRow} label="Category" />
      <Field
        name="identifier"
        type="text"
        component={DataRow}
        label="Identifier"
      />
      <DataRow type="display" label="Created on" value={createdOn} />
      <Field
        name="description"
        type="textarea"
        component={DataRow}
        label="Description"
      />
      <footer className="p2 center">
        <Button type="submit" disabled={submitting} label="Save" />
      </footer>
    </form>
  );
};

Basics.propTypes = {
  project: PropTypes.object,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      // this is automatically called on submit (after redux-form has done its magic)
      dispatch(updateProject(data));
    },
  };
}

const mapState = createStructuredSelector({
  initialValues: selectProject(),
});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'Basics',
  })(Basics)
);
