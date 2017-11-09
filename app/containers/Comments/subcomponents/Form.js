import React, { PropTypes } from 'react';
import Button from 'components/Button';
import { MentionsInput, Mention } from 'react-mentions';

class Form extends React.PureComponent {
  state = { value: '' };
  componentDidMount() {
    const { comment } = this.props;
    if (comment) this.setValue(comment.get('text'));
    this.inputRef.focus();
  }
  setValue = (value) => {
    this.setState({ value });
  };
  handleChange = (e) => {
    this.setValue(e.target.value);
  };
  handleRef = (ref) => {
    this.inputRef = ref.wrappedInstance.refs.input;
  };
  Textarea = () => {
    const { collaborators } = this.props;
    return (
      <MentionsInput
        value={this.state.value}
        onChange={this.handleChange}
        ref={this.handleRef}
      >
        <Mention trigger="@" data={collaborators.toJS()} />
      </MentionsInput>
    );
  };
  Actions = () => {
    const { cancelCommentAction } = this.props;
    return (
      <div className="comment-form-actions">
        <Button onClick={cancelCommentAction} label="Cancel" shy />
        <Button type="submit" label="Submit" small />
      </div>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    const { Textarea, Actions } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Textarea />
          <Actions />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  collaborators: PropTypes.object,
  comment: PropTypes.object,
  handleSubmit: PropTypes.func,
  cancelCommentAction: PropTypes.func,
};

export default Form;
