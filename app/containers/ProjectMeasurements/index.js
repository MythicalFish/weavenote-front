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
  Wrapper = ({ children }) => {
    const { modal } = this.state;
    if (!modal) return children;
    return (
      <ModalMarkup
        isOpen
        noCloseOutside
        maxWidth="100%"
        closeFunc={() => this.setState({ modal: false })}
      >
        <div className="p4">{children}</div>
      </ModalMarkup>
    );
  };
  render() {
    const { Wrapper } = this;
    const { measurements: m } = this.props;
    if (!m) return null;
    return (
      <Wrapper>
        <Form
          {...{
            ...this.props,
            lastUpdated: m.timestamp,
            enableReinitialize: true,
            showInModal: () => this.setState({ modal: true }),
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
