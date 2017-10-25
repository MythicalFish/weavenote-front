import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Checkbox from 'components/Checkbox';
import * as selectors from './selectors';
import { configure, doExport, resetExport } from './actions';

class ProjectExport extends React.PureComponent {
  toggleOption = (name) => () => {
    const { options } = this.props;
    const option = {};
    option[name] = !options.get(name);
    this.props.configure(option);
  };
  render() {
    const { options, url, state, closeModal } = this.props;
    const { finished, inProgress } = state.toJS();
    const isNewExport = !finished && !inProgress;
    return (
      <Modal id="export" cosy width="700px">
        <header className="modal-header">Export to PDF</header>
        {isNewExport && (
          <div>
            <div className="modal-body">
              <Checkbox
                checked={options.get('basics')}
                onClick={this.toggleOption('basics')}
                label="Basic information"
              />
              <Checkbox
                checked={options.get('materials')}
                onClick={this.toggleOption('materials')}
                label="Materials"
              />
              <Checkbox
                checked={options.get('measurements')}
                onClick={this.toggleOption('measurements')}
                label="Measurements"
              />
              <Checkbox
                checked={options.get('instructions')}
                onClick={this.toggleOption('instructions')}
                label="Instructions"
              />
              <Checkbox
                checked={options.get('comments')}
                onClick={this.toggleOption('comments')}
                label="Comments"
              />
            </div>
            <footer className="modal-footer right-align">
              <Button label="Cancel" secondary inline onClick={closeModal} />
              <Button label="Export" onClick={this.props.doExport} />
            </footer>
          </div>
        )}
        {inProgress && <Spinner />}
        {finished && (
          <div>
            <div className="modal-body">...</div>
            <footer className="modal-footer">
              <Button
                label="Export again"
                secondary
                inline
                onClick={this.props.resetExport}
              />
              <Button newTab={url} label="Download" icon="DownloadCloud" />
            </footer>
          </div>
        )}
      </Modal>
    );
  }
}

ProjectExport.propTypes = {
  options: PropTypes.object,
  state: PropTypes.object,
  url: PropTypes.string,
  configure: PropTypes.func,
  doExport: PropTypes.func,
  resetExport: PropTypes.func,
  closeModal: PropTypes.func,
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
