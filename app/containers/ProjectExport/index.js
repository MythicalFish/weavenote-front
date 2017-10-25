import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import * as selectors from './selectors';
import { configure, doExport, resetExport } from './actions';
import { COMMENT_OPTIONS } from './constants';

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
              <div className="field field-theme-alt1">
                <div className="input">
                  <Dropdown value={{ name: options.get('comments') }}>
                    {COMMENT_OPTIONS.map((opt, i) => (
                      <button
                        type="button"
                        onClick={() => this.props.configure({ comments: opt })}
                        key={i}
                      >
                        {opt}
                      </button>
                    ))}
                  </Dropdown>
                </div>
              </div>
              <Checkbox
                checked={options.get('secondary_images')}
                onClick={this.toggleOption('secondary_images')}
                label="Secondary images"
              />
            </div>
            <footer className="modal-footer right-align">
              <Button label="Cancel" secondary inline onClick={closeModal} />
              <Button label="Export" onClick={this.props.doExport} />
            </footer>
          </div>
        )}
        {inProgress && (
          <div className="modal-body">
            <Spinner />
          </div>
        )}
        {finished && (
          <div>
            <div className="modal-body">...</div>
            <footer className="modal-footer right-align">
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
