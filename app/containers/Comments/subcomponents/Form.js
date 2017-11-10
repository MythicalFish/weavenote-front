import React, { PropTypes } from 'react';
import Button from 'components/Button';
import { MentionsInput, Mention } from 'react-mentions';

class Form extends React.PureComponent {
  state = { value: '', mentioned: [] };
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
    const { mentioned } = this.state;
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
      mentioned,
    });
  };
  handleAdd = (id) => {
    const { mentioned } = this.state;
    if (!mentioned.includes(id)) mentioned.push(id);
    this.setState({ mentioned });
  };
  handleDisplay = (id, display) => `@${display}`;
  Textarea = () => (
    <MentionsInput
      value={this.state.value}
      onChange={this.handleChange}
      ref={this.handleRef}
      displayTransform={this.handleDisplay}
      markup="<b>@__id__</b>"
    >
      <Mention
        trigger="@"
        data={this.props.collaborators.toJS()}
        onAdd={this.handleAdd}
        appendSpaceOnAdd
        style={{ color: '#222' }}
      />
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
