import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/FormInput';
import Button from 'components/Button';

const Form = (props) =>
  <div>
    <form onSubmit={props.handleSubmit}>
      <Textarea {...props} />
      <Actions {...props} />
    </form>
  </div>;

const Textarea = ({ handleSubmit }) =>
  <Field
    name="comment[text]"
    type="textarea"
    component={Input}
    onEnterKey={handleSubmit}
  />;

const Actions = ({ cancelCommentAction }) =>
  <div className="comment-form-actions">
    <Button onClick={cancelCommentAction} label="Cancel" shy />
    <Button type="submit" label="Submit" small />
  </div>;

Textarea.propTypes = {
  handleSubmit: PropTypes.func,
};
Actions.propTypes = {
  cancelCommentAction: PropTypes.func,
};
Form.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'CommentForm',
})(Form);
