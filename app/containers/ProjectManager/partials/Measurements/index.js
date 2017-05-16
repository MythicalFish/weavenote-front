import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMeasurements } from '../../selectors';
import { fetchMeasurements } from '../../actions';
import Form from './Form';

class Measurements extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchMeasurements(project.id);
  }

  render() {
    const { project, measurements } = this.props;
    if (measurements.size < 1) return null;
    return (
      <div>
        <Form initialValues={measurements} onSubmit={(data) => { console.log(data); }} />
      </div>
    );
  }
}

Measurements.propTypes = {
  project: PropTypes.object,
  measurements: PropTypes.object,
  fetchMeasurements: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMeasurements },
    dispatch
  );
}

const mapState = createStructuredSelector({
  measurements: selectMeasurements(),
});

export default connect(mapState, mapDispatch)(Measurements);
