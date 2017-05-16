import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { fetchMeasurements } from '../../actions';

class Measurements extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchMeasurements(project.id);
  }

  render() {
    const { project } = this.props;
    return (
      <div className="row">
        mats
      </div>
    );
  }
}

Measurements.propTypes = {
  project: PropTypes.object,
  fetchMeasurements: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMeasurements },
    dispatch
  );
}

const mapState = createStructuredSelector({

});

export default connect(mapState, mapDispatch)(Measurements);
