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
    this.props.fetch(project.get('id'));
  }
  hasAny = () => {
    const { initialValues: v } = this.props;
    return v.get('groups').size > 0 || v.get('names').size > 0;
  };
  render() {
    const { initialValues: m } = this.props;
    if (!m) return null;
    const Measurements = () => (
      <div>
        {this.hasAny() ? (
          <Form
            {...{
              ...this.props,
              lastUpdated: m.get('timestamp'),
              enableReinitialize: true,
            }}
          />
        ) : (
          <div>No measurements added yet</div>
        )}
      </div>
    );
    const Wrapper = ({ children }) => {
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
    return (
      <div>
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
      reorder: (payload) => reorderMeasurements(payload),
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  initialValues: selectors.selectMeasurements(),
});

export default connect(mapState, mapDispatch)(ProjectMeasurements);
