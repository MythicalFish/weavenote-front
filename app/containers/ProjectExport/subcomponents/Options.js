import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import { COMMENT_OPTIONS } from '../constants';

class Options extends React.PureComponent {
  static propTypes = {
    options: PropTypes.object,
    configure: PropTypes.func,
    closeModal: PropTypes.func,
    doExport: PropTypes.func,
    resize: PropTypes.func,
  };
  componentDidMount() {
    this.props.resize();
  }
  toggleOption = (name) => () => {
    const { options } = this.props;
    const option = {};
    option[name] = !options.get(name);
    this.props.configure(option);
  };
  render() {
    const { options, configure, closeModal, doExport } = this.props;
    return (
      <div>
        <div className="modal-body">
          <div className="row mb3">
            <div className="col-xs-6">
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
            </div>
            <div className="col-xs-6">
              <Checkbox
                checked={options.get('instructions')}
                onClick={this.toggleOption('instructions')}
                label="Instructions"
              />
              <Checkbox
                checked={options.get('secondary_images')}
                onClick={this.toggleOption('secondary_images')}
                label="Secondary images"
              />
            </div>
          </div>
          <div className="field field-theme-alt1">
            <div className="input">
              <Dropdown value={{ name: options.get('comments') }} matchWidth>
                {COMMENT_OPTIONS.map((opt, i) => (
                  <button
                    type="button"
                    onClick={() => configure({ comments: opt })}
                    key={i}
                  >
                    {opt}
                  </button>
                ))}
              </Dropdown>
            </div>
          </div>
        </div>
        <footer className="modal-footer right-align">
          <Button label="Cancel" secondary inline onClick={closeModal} />
          <Button label="Export" onClick={doExport} />
        </footer>
      </div>
    );
  }
}

export default Options;
