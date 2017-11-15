import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import PlusButton from 'components/PlusButton';
import RowLabels from './RowLabels';
import ColumnLabels from './ColumnLabels';
import ColumnValues from './ColumnValues';
import { COLUMNS_OFFSET } from '../constants';

class Form extends React.PureComponent {
  state = { scrollTop: 0, scrollLeft: 0, maxHeight: 0, colWidths: {} };
  setHeight = (maxHeight) => this.setState({ maxHeight });
  setColWidth = (colKey, length) => {
    const colWidths = { ...this.state.colWidths };
    if (length > (colWidths[colKey] || 0)) {
      colWidths[colKey] = length;
      this.setState({ colWidths });
    }
  };
  doScroll = ({ scrollTop, scrollLeft }) =>
    this.setState({ scrollTop, scrollLeft });
  heightStyle = () => {
    const { maxHeight } = this.state;
    if (maxHeight === 0) return {};
    return { maxHeight };
  };
  offsetY = () => ({
    style: {
      transform: `translateY(-${this.state.scrollTop}px)`,
    },
  });
  offsetX = () => ({
    style: {
      transform: `translateX(-${this.state.scrollLeft}px)`,
      paddingTop: '45px',
    },
  });
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
                <div {...this.offsetY()}>
                  <RowLabels {...cProps} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <div className="y-fill flex flex-column center">
              <div className="flex-none relative" style={{ height: '41px' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-45px',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    overflow: 'hidden',
                  }}
                >
                  <div {...this.offsetX()}>
                    <ColumnLabels {...cProps} />
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-auto" onScrollFrame={this.doScroll}>
                <ColumnValues {...cProps} />
              </ScrollArea>
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
