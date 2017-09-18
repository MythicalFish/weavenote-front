import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { addAnnotation } from 'containers/ProjectImages/actions';
import * as selectors from './selectors';
import {
  fetchMeasurements,
  updateMeasurements,
  createMeasurementGroup,
  createMeasurementName,
  deleteMeasurementGroup,
  deleteMeasurementName,
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
    return (
      <div>
        {this.hasAny() ? (
          <Form {...this.props} />
        ) : (
          <div>No measurements added yet</div>
        )}
      </div>
    );
  }
}

ProjectMeasurements.propTypes = {
  project: PropTypes.object,
  initialValues: PropTypes.object,
  fetch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetch: fetchMeasurements,
      onSubmit: updateMeasurements,
      createGroup: (id) => createMeasurementGroup(id),
      createName: (id) => createMeasurementName(id),
      deleteGroup: (id) => deleteMeasurementGroup(id),
      deleteName: (id) => deleteMeasurementName(id),
      addAnnotation,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  initialValues: selectors.selectMeasurements(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
