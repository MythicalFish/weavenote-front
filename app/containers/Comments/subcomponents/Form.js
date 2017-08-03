import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';
import Avatar from 'components/Avatar';

class CommentForm extends React.PureComponent {
  render() {
    const { handleSubmit, user, label, onFocus, isActive } = this.props;
    const Form = (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="comment[text]"
            type="textarea"
            component={Input}
            focus
            onEnterKey={handleSubmit}
          />
        </form>
        <Button onClick={this.props.cancelCommentAction} label="Cancel" />
      </div>
    );
    const StartButton = (
      <button type="button" onClick={onFocus}>
        {label}
      </button>
    );
    return (
      <div className="comment">
        <div className="comment-avatar">
          <Avatar user={user} small />
        </div>
        <div className="comment-body">
          {isActive ? Form : StartButton}
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  user: PropTypes.object,
};

export default reduxForm({
  form: 'CommentForm',
})(CommentForm);
