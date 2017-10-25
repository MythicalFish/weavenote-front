import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Checkbox from 'components/Checkbox';
import * as selectors from './selectors';
import { configure, exportPDF } from './actions';

class ProjectExport extends React.PureComponent {
  toggleOption = (name) => () => {
    const { options } = this.props.pdfExport.toJS();
    const option = {};
    option[name] = !options.name;
    this.props.configure(option);
  };
  render() {
    const { pdfExport, exportPDF } = this.props;
    const { finished, inProgress, url, options } = pdfExport.toJS();
    const isNewExport = !finished && !inProgress;
    return (
      <Modal id="export">
        <header className="modal-header">Export to PDF</header>
        {isNewExport && (
          <div>
            <div className="modal-body">
              <Checkbox
                checked={options.comments}
                onClick={this.toggleOption('comments')}
              />{' '}
              Comments
            </div>
            <footer className="modal-footer">
              <Button label="Export" onClick={exportPDF} />
            </footer>
          </div>
        )}
        {inProgress && <Spinner />}
        {finished && (
          <Button newTab={url} label="Download" icon="DownloadCloud" />
        )}
      </Modal>
    );
  }
}

ProjectExport.propTypes = {
  pdfExport: PropTypes.object,
  configure: PropTypes.func,
  exportPDF: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ configure, exportPDF }, dispatch);
}

const mapState = createStructuredSelector({
  pdfExport: selectors.selectExport(),
});

export default connect(mapState, mapDispatch)(ProjectExport);
