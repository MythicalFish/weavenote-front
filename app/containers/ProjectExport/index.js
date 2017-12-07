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
import { DEFAULT_WIDTH } from './constants';

class ProjectExport extends React.PureComponent {
  state = { width: DEFAULT_WIDTH };
  resize = (val) => {
    let width = DEFAULT_WIDTH;
    if (val) width = val;
    this.setState({ width });
  };
  render() {
    const { state } = this.props;
    const { finished, inProgress } = state.toJS();
    const isNewExport = !finished && !inProgress;
    const { resize } = this;
    const pProps = { ...this.props, resize };
    return (
      <Modal id="export" cosy width={this.state.width}>
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
