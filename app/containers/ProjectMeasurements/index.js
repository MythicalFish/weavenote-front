import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/ModalLayout';
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
  state = { isModal: false };
  componentDidMount() {
    const { project } = this.props;
    this.props.fetchMeasurements(project.get('id'));
  }
  Wrapper = ({ children }) => {
    const { isModal } = this.state;
    if (!isModal) return children;
    return (
      <Modal
        isOpen
        noCloseOutside
        width="600px"
        handleClose={() => this.setState({ isModal: false })}
      >
        <div className="p4">{children}</div>
      </Modal>
    );
  };
  render() {
    const { Wrapper } = this;
    const { measurements: m } = this.props;
    const { isModal } = this.state;
    if (!m) return null;
    return (
      <Wrapper>
        <Form
          {...{
            ...this.props,
            lastUpdated: m.timestamp,
            enableReinitialize: true,
            showInModal: () => this.setState({ isModal: true }),
            isModal,
          }}
        />
      </Wrapper>
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
