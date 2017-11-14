import React, { PropTypes } from 'react';
import Button from 'components/Button';
import PlusButton from 'components/PlusButton';
import RowLabels from './RowLabels';
import ColumnLabels from './ColumnLabels';
import ColumnValues from './ColumnValues';

class Form extends React.PureComponent {
  state = { scrollTop: 0 };
  componentDidMount() {
    this.ref.addEventListener('scroll', (e) => this.doScroll(e.target.scrollTop));
  }
  doScroll = (scrollTop) => this.setState({ scrollTop });
  render() {
    const { project, showInModal, isModal, readOnly } = this.props;
    const id = project.get('id');
    return (
      <div id="measurements" className="y-fill flex flex-column">
        <div className="flex flex-auto">
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
                  <RowLabels {...this.props} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <div className="flex scroll-x y-fill">
              <div className="flex-none flex flex-column center">
                <ColumnLabels {...this.props} />
                <div
                  className="flex-auto scroll-y"
                  ref={(ref) => (this.ref = ref)}
                >
                  <ColumnValues {...this.props} doScroll={this.doScroll} />
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
        <div className="py2 flex-none flex">
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
