import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

const CommentForm = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="text" type="textarea" component={Input} />
      <Button type="submit" disabled={submitting} label="Add comment" />
    </form>
  );
};

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'CommentForm',
})(CommentForm);
