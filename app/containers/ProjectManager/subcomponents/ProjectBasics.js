import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import InputRow from 'components/FormField';
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
    <form className="p4" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={InputRow} label="Name" />
      <Field
        name="category"
        type="text"
        component={InputRow}
        label="Category"
      />
      <Field
        name="identifier"
        type="text"
        component={InputRow}
        label="Identifier"
      />
      <InputRow type="display" label="Created on" value={createdOn} />
      <Field
        name="description"
        type="textarea"
        component={InputRow}
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
