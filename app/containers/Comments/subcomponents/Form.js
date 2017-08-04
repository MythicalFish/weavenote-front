import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/FormInput';
import Button from 'components/Button';

const CommentForm = (props) =>
  <div>
    <form onSubmit={props.handleSubmit}>
      <Field
        name="comment[text]"
        type="textarea"
        component={Input}
        focus
        onEnterKey={props.handleSubmit}
      />
    </form>
    <div className="actions">
      <Button onClick={props.cancelCommentAction} label="Cancel" />
    </div>
  </div>;

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  cancelCommentAction: PropTypes.func,
};

export default reduxForm({
  form: 'CommentForm',
})(CommentForm);
