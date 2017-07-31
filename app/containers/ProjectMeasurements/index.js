import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PlusButton from 'components/PlusButton';
import Dropdown from 'components/Dropdown';
import { selectMeasurements } from './selectors';
import {
  fetchMeasurements,
  updateMeasurements,
  createMeasurementGroup,
  createMeasurementName,
} from './actions';
import Form from './subcomponents/Form';

class ProjectMeasurements extends React.PureComponent {
  componentDidMount() {
    const { project } = this.props;
    this.props.fetch(project.get('id'));
  }
  hasAny = () => {
    const { measurements } = this.props;
    return (
      measurements.get('groups').size > 0 || measurements.get('names').size > 0
    );
  };
  render() {
    const { project, measurements, createGroup, createName } = this.props;
    if (!measurements) return null;
    return (
      <div>
        {this.hasAny()
          ? <Form initialValues={measurements} onSubmit={this.props.update} />
          : <div>No measurements added yet</div>}

        <Dropdown label={<PlusButton />}>
          <button onClick={() => createGroup(project.get('id'))}>
            Create Column
          </button>
          <button onClick={() => createName(project.get('id'))}>
            Create Row
          </button>
        </Dropdown>
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
