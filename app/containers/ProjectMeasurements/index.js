import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PlusButton from 'components/PlusButton';
import { selectMeasurements } from './selectors';
import {
  fetchMeasurements,
  updateMeasurements,
  createMeasurementGroup,
  createMeasurementName,
} from './actions';
import Form from './Form';

class ProjectMeasurements extends React.PureComponent {
  componentDidMount() {
    const { project } = this.props;
    this.props.fetchMeasurements(project.get('id'));
  }

  update = (data) => {
    this.props.updateMeasurements(data);
  };

  createGroup = (projectID) => {
    this.props.createMeasurementGroup(projectID);
  };

  createName = (projectID) => {
    this.props.createMeasurementName(projectID);
  };

  render() {
    const { project, measurements } = this.props;
    if (measurements.size < 1) return null;
    return (
      <div>
        <div className="right-align">
          <PlusButton
            onClick={() => {
              this.createGroup(project.get('id'));
            }}
          />
        </div>
        <Form initialValues={measurements} onSubmit={this.update} />
        <div>
          <PlusButton
            onClick={() => {
              this.createName(project.get('id'));
            }}
          />
        </div>
      </div>
    );
  }
}

ProjectMeasurements.propTypes = {
  project: PropTypes.object,
  measurements: PropTypes.object,
  fetchMeasurements: PropTypes.func,
  updateMeasurements: PropTypes.func,
  createMeasurementGroup: PropTypes.func,
  createMeasurementName: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchMeasurements,
      updateMeasurements,
      createMeasurementGroup,
      createMeasurementName,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  measurements: selectMeasurements(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
