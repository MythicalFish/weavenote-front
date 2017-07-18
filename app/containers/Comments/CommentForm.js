import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

class CommentForm extends React.PureComponent {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="text" type="textarea" component={Input} focus />
        <Button type="submit" disabled={submitting} label="Submit" />
      </form>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'CommentForm',
})(CommentForm);
