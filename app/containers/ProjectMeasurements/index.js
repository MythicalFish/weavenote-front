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
    this.props.fetch(project.get('id'));
  }

  render() {
    const { project, measurements, createGroup, createName } = this.props;
    if (!measurements) return null;
    return (
      <div>
        <div className="right-align">
          <PlusButton onClick={() => createGroup(project.get('id'))} />
        </div>
        <Form initialValues={measurements} onSubmit={this.props.update} />
        <div>
          <PlusButton onClick={() => createName(project.get('id'))} />
        </div>
      </div>
    );
  }
}

ProjectMeasurements.propTypes = {
  project: PropTypes.object,
  measurements: PropTypes.object,
  fetch: PropTypes.func,
  update: PropTypes.func,
  createGroup: PropTypes.func,
  createName: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetch: fetchMeasurements,
      update: updateMeasurements,
      createGroup: (id) => createMeasurementGroup(id),
      createName: (id) => createMeasurementName(id),
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  measurements: selectMeasurements(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
