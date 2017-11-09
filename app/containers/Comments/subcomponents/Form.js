import React, { PropTypes } from 'react';
import Button from 'components/Button';
import { MentionsInput, Mention } from 'react-mentions';

class Form extends React.PureComponent {
  state = { value: '' };
  componentDidMount() {
    const { comment } = this.props;
    if (comment) this.setValue(comment.get('text'));
    if (this.inputRef) this.inputRef.focus();
  }
  setValue = (value) => {
    this.setState({ value });
  };
  handleChange = (e) => {
    this.setValue(e.target.value);
  };
  handleRef = (ref) => {
    if (ref) this.inputRef = ref.wrappedInstance.refs.input;
  };
  handleSubmit = (e) => {
    const { commentable } = this.props;
    let { comment } = this.props;
    if (comment) {
      comment = comment.toJS();
    } else {
      comment = {};
    }
    comment.text = this.state.value;
    e.preventDefault();
    this.props.onSubmit({
      comment,
      commentable,
    });
  };
  Textarea = () => (
    <MentionsInput
      value={this.state.value}
      onChange={this.handleChange}
      ref={this.handleRef}
    >
      <Mention trigger="@" data={this.props.collaborators.toJS()} />
    </MentionsInput>
  );
  Actions = () => (
    <div className="comment-form-actions">
      <Button onClick={this.props.cancelCommentAction} label="Cancel" shy />
      <Button type="submit" label="Submit" small />
    </div>
  );
  render() {
    const { Textarea, Actions } = this;
    return (
      <form onSubmit={this.handleSubmit}>
        <Textarea />
        <Actions />
      </form>
    );
  }
}

Form.propTypes = {
  collaborators: PropTypes.object,
  comment: PropTypes.object,
  onSubmit: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  commentable: PropTypes.object,
};

export default Form;
