import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ModalMarkup } from 'components/Modal';
import Button from 'components/Button';
import * as selectors from './selectors';
import {
  fetchMeasurements,
  updateMeasurements,
  createMeasurementGroup,
  createMeasurementName,
  deleteMeasurementGroup,
  deleteMeasurementName,
  reorderMeasurements,
} from './actions';
import Form from './subcomponents/Form';

class ProjectMeasurements extends React.PureComponent {
  state = { modal: false };
  componentDidMount() {
    const { project } = this.props;
    this.props.fetchMeasurements(project.get('id'));
  }
  hasAny = () => {
    const { measurements: v } = this.props;
    return v.groups.length > 0 || v.names.length > 0;
  };
  Wrapper = ({ children }) => {
    const { modal } = this.state;
    if (!modal) return children;
    return (
      <ModalMarkup
        isOpen
        noCloseOutside
        closeFunc={() => {
          this.setState({ modal: false });
        }}
      >
        <div className="p4">{children}</div>
      </ModalMarkup>
    );
  };
  Measurements = () => {
    if (!this.hasAny()) return <div>No measurements added yet</div>;
    const { measurements: m } = this.props;
    return (
      <Form
        {...{
          ...this.props,
          lastUpdated: m.timestamp,
          enableReinitialize: true,
        }}
      />
    );
  };
  render() {
    const { Wrapper, Measurements } = this;
    const { measurements: m } = this.props;
    if (!m) return null;
    return (
      <div className="y-fill">
        <Wrapper>
          <Measurements />
        </Wrapper>
        <div className="mt3">
          <Button
            label="View in modal"
            secondary
            small
            onClick={() => this.setState({ modal: true })}
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
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchMeasurements,
      updateMeasurements,
      createGroup: (id) => createMeasurementGroup(id),
      createName: (id) => createMeasurementName(id),
      deleteGroup: (id) => deleteMeasurementGroup(id),
      deleteName: (id) => deleteMeasurementName(id),
      reorder: (payload) => reorderMeasurements(payload),
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  measurements: selectors.selectMeasurements(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
