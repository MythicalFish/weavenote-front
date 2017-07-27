import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';

const ProjectForm = (props) => {
  const { handleSubmit, submitting, project } = props;
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
        <Button type="submit" disabled={submitting} label="Save" icon="Save" />
      </footer>
    </form>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'ProjectForm',
})(ProjectForm);
