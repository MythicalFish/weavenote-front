import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectRoleTypes } from '../selectors';
import { fetchRoleTypes } from '../actions';
import SelectInput from 'components/SelectInput';

class RoleSelector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchRoleTypes();
  }
  render() {
    return null;
  }
}

RoleSelector.propTypes = {
  fetchRoleTypes: PropTypes.func,
  roleTypes: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchRoleTypes },
    dispatch
  );
}

const mapState = createStructuredSelector({
  roleTypes: selectRoleTypes(),
});

export default connect(mapState, mapDispatch)(RoleSelector);
