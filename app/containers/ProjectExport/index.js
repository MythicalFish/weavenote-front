import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Options from './subcomponents/Options';
import Preview from './subcomponents/Preview';
import * as selectors from './selectors';
import { configure, doExport, resetExport } from './actions';
import { DEFAULT_SIZE } from './constants';

class ProjectExport extends React.PureComponent {
  state = { size: DEFAULT_SIZE };
  resize = (val) => {
    let size = DEFAULT_SIZE;
    if (val) size = val;
    this.setState({ size });
  };
  render() {
    const { state } = this.props;
    const { finished, inProgress } = state.toJS();
    const isNewExport = !finished && !inProgress;
    const { resize } = this;
    const pProps = { ...this.props, resize };
    const { height, width } = this.state.size;
    return (
      <Modal id="export" cosy width={width} height={height}>
        <div className="flex flex-column y-fill">
          <header className="flex-none modal-header">Export to PDF</header>
          {isNewExport && <Options {...pProps} />}
          {inProgress && (
            <div className="modal-body">
              <Spinner />
            </div>
          )}
          {finished && <Preview {...pProps} />}
        </div>
      </Modal>
    );
  }
}

ProjectExport.propTypes = {
  state: PropTypes.object,
  openModal: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ configure, doExport, resetExport }, dispatch);
}

const mapState = createStructuredSelector({
  url: selectors.selectURL(),
  state: selectors.selectState(),
  options: selectors.selectOptions(),
});

export default connect(mapState, mapDispatch)(ProjectExport);
