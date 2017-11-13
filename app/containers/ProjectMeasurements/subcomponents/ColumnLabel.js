import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';

class ColumnLabel extends React.PureComponent {
  handleChange = (value) => {
    const { group } = this.props;
    this.props.updateMeasurements({
      groups: [Object.assign(group, { name: value })],
    });
  };
  render() {
    //
    const { group, doDelete, readOnly } = this.props;
    return (
      <div className="column">
        <div className="column-header relative">
          {!readOnly && <div className="handle-above" />}
          {!readOnly && (
            <DeleteButton
              resourceName="column"
              onClick={() => doDelete(group.id)}
              className="above"
            />
          )}
          <Input
            maxLength={16}
            placeholder="x"
            defaultValue={group.name}
            handleChange={this.handleChange}
            readOnly={readOnly}
          />
        </div>
      </div>
    );
  }
}

ColumnLabel.propTypes = {
  readOnly: PropTypes.bool,
  group: PropTypes.object,
  doDelete: PropTypes.func,
  updateMeasurements: PropTypes.func,
};

export default SortableElement(ColumnLabel);
