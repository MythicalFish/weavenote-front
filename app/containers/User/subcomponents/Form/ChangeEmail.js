import React, { PropTypes } from 'react';
import { FormField } from 'components/FormField';
import Button from 'components/Button';

class ChangeEmail extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.changeEmail(this.input.value);
  };
  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <div className="col-xs-9">
          <FormField
            name="email"
            type="email"
            theme="alt1"
            defaultValue={this.props.user.get('email')}
            handleRef={(ref) => (this.input = ref)}
            disableReduxForm
          />
        </div>
        <div className="col-xs-3">
          <Button secondary type="submit" label="Submit" />
        </div>
      </form>
    );
  }
}

ChangeEmail.propTypes = {
  changeEmail: PropTypes.func,
};

export default ChangeEmail;
