import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Field from 'components/FormField';

const ProjectForm = (props) => {
  const { onSubmit, handleSubmit, submitting } = props;
  const f = {
    onChange: onSubmit,
  };
  return (
    <form onSubmit={handleSubmit}>
      <Field type="text" name="name" label="Name" {...f} focus />
      <Field type="text" name="ref_number" label="Reference no." {...f} />
      <Field type="text" name="color_code" label="Color" {...f} />
      <Field type="text" name="collection" label="Collection" {...f} />
      <Field type="text" name="target_fob" label="Target price" {...f} />
      <Field type="textarea" name="notes" label="Details" {...f} />
      <button type="submit" disabled={submitting} className="conceal" />
    </form>
  );
};

ProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'ProjectForm',
})(ProjectForm);
