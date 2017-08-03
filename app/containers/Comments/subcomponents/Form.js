import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

class CommentForm extends React.PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
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
        <div className="actions p1">
          <Button onClick={this.props.cancelCommentAction} label="Cancel" />
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  cancelCommentAction: PropTypes.func,
};

export default reduxForm({
  form: 'CommentForm',
})(CommentForm);
