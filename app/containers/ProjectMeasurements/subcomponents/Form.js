import React, { PropTypes } from 'react';
import Button from 'components/Button';
import PlusButton from 'components/PlusButton';
import RowLabels from './RowLabels';
import ColumnLabels from './ColumnLabels';
import ColumnValues from './ColumnValues';

class Form extends React.PureComponent {
  state = { scrollTop: 0 };
  doScroll = (scrollTop) => this.setState({ scrollTop });
  render() {
    const { project, showInModal, isModal, readOnly } = this.props;
    const id = project.get('id');
    return (
      <div id="measurements" className="y-fill">
        <div className="flex y-fill">
          <div className="flex-none mr1">
            <div className="flex flex-column">
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
                  <RowLabels {...this.props} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <div className="flex scroll-x y-fill">
              <div className="flex-none flex flex-column center mr1">
                <ColumnLabels {...this.props} />
                <ColumnValues {...this.props} doScroll={this.doScroll} />
              </div>
              {!readOnly && (
                <div className="flex-none">
                  <PlusButton
                    size={25}
                    onClick={() => this.props.createGroup(id)}
                    className="p0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt1">
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
