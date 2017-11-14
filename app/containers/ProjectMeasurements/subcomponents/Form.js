import React, { PropTypes } from 'react';
import Button from 'components/Button';
import PlusButton from 'components/PlusButton';
import RowLabels from './RowLabels';
import ColumnLabels from './ColumnLabels';
import ColumnValues from './ColumnValues';

class Form extends React.PureComponent {
  state = { scrollTop: 0, maxHeight: 0, colWidths: {} };
  componentDidMount() {
    this.ref.addEventListener('scroll', (e) => this.doScroll(e.target.scrollTop));
  }
  setHeight = (maxHeight) => this.setState({ maxHeight });
  setColWidth = (colKey, length) => {
    const colWidths = { ...this.state.colWidths };
    if (length > (colWidths[colKey] || 0)) {
      colWidths[colKey] = length;
      this.setState({ colWidths });
    }
  };
  doScroll = (scrollTop) => this.setState({ scrollTop });
  heightStyle = () => {
    const { maxHeight } = this.state;
    if (maxHeight === 0) return {};
    return { maxHeight };
  };
  render() {
    const { project, showInModal, isModal, readOnly } = this.props;
    const id = project.get('id');
    const { maxHeight, colWidths } = this.state;
    const { setHeight, setColWidth } = this;
    const cProps = {
      ...this.props,
      setHeight,
      maxHeight,
      colWidths,
      setColWidth,
    };
    return (
      <div id="measurements" className="y-fill flex flex-column">
        <div className="flex flex-auto" style={this.heightStyle()}>
          <div className="flex-none">
            <div className="flex flex-column y-fill">
              <div className="flex-none">
                <div className="column-header px1">
                  <label className="opa5">Description</label>
                </div>
              </div>
              <div className="flex-auto cut">
                <div
                  style={{
                    transform: `translateY(-${this.state.scrollTop}px)`,
                  }}
                >
                  <RowLabels {...cProps} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <div className="flex scroll-x y-fill">
              <div className="flex-none flex flex-column center">
                <ColumnLabels {...cProps} />
                <div
                  className="flex-auto scroll-y"
                  ref={(ref) => (this.ref = ref)}
                >
                  <ColumnValues {...cProps} />
                </div>
              </div>
            </div>
          </div>
          {!readOnly && (
            <div className="flex-none pl2">
              <PlusButton
                size={25}
                onClick={() => this.props.createGroup(id)}
                className="p0"
              />
            </div>
          )}
        </div>
        <div className="py2 flex-none flex justify-between">
          {!readOnly && (
            <PlusButton
              size={25}
              onClick={() => this.props.createName(id)}
              className="p0"
            />
          )}
          {!isModal && (
            <div className="ml1">
              <Button
                label="View in modal"
                secondary
                small
                onClick={showInModal}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  readOnly: PropTypes.bool,
  project: PropTypes.object,
  createName: PropTypes.func,
  createGroup: PropTypes.func,
  showInModal: PropTypes.func,
  isModal: PropTypes.bool,
};

export default Form;
