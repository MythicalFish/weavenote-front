import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import { updateProfile } from '../../actions';

const BasicInfo = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="data-rows" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={DataRow} label="Name" />
      <footer className="p2 center">
        <Button type="submit" disabled={submitting} label="Save" />
      </footer>
    </form>
  );
};

BasicInfo.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return {
    handleUpdate: (data) => {
      dispatch(updateProfile(data));
    },
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'BasicInfo',
  })(BasicInfo)
);
