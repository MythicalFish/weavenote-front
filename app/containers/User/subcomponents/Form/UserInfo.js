import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputRow from 'components/FormField';
import { updateUser } from '../../actions';

const UserInfo = (props) => {
  const { handleSubmit, submitting, onSubmit } = props;
  return (
    <form className="data-rows" onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={InputRow}
        label="Name"
        onBlur={onSubmit}
      />
      <button type="submit" disabled={submitting} className="conceal" />
    </form>
  );
};

UserInfo.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      dispatch(updateUser(data));
    },
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'UserInfo',
  })(UserInfo)
);
