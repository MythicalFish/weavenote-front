import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PlusButton from 'components/PlusButton';
import Dropdown from 'components/Dropdown';
import * as selectors from './selectors';
import {
  fetchMeasurements,
  updateMeasurements,
  createMeasurementGroup,
  createMeasurementName,
  focusMeasurementGroup,
  focusMeasurementName,
  unfocusMeasurements,
} from './actions';
import Form from './subcomponents/Form';

class ProjectMeasurements extends React.PureComponent {
  componentDidMount() {
    const { project } = this.props;
    this.props.fetch(project.get('id'));
  }
  hasAny = () => {
    const { initialValues: v } = this.props;
    return v.get('groups').size > 0 || v.get('names').size > 0;
  };
  render() {
    if (!this.props.initialValues) return null;
    const { project, createGroup, createName } = this.props;
    const id = project.get('id');
    return (
      <div>
        {this.hasAny()
          ? <Form {...this.props} />
          : <div>No measurements added yet</div>}

        <Dropdown label={<PlusButton />}>
          <button onClick={() => createGroup(id)}>Create Column</button>
          <button onClick={() => createName(id)}>Create Row</button>
        </Dropdown>
      </div>
    );
  }
}

ProjectMeasurements.propTypes = {
  project: PropTypes.object,
  initialValues: PropTypes.object,
  fetch: PropTypes.func,
  createGroup: PropTypes.func,
  createName: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      focusMeasurementName,
      focusMeasurementGroup,
      unfocusMeasurements,
      fetch: fetchMeasurements,
      onSubmit: updateMeasurements,
      createGroup: (id) => createMeasurementGroup(id),
      createName: (id) => createMeasurementName(id),
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  initialValues: selectors.selectMeasurements(),
  currentMeasurementName: selectors.selectCurrentName(),
  currentMeasurementGroup: selectors.selectCurrentGroup(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
