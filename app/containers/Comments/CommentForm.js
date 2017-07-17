import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

class CommentForm extends React.PureComponent {
  state = { creating: false };
  toggleState = () => {
    this.setState({ creating: !this.state.creating });
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        {this.state.creating &&
          <form onSubmit={handleSubmit}>
            <Field name="text" type="textarea" component={Input} />
            <Button type="submit" disabled={submitting} label="Submit" />
          </form>}
        <Button label="Leave a comment" inline onclick={this.toggleState} />
      </div>
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
