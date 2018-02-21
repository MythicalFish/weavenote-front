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
    const { group, deleteGroup, readOnly } = this.props;
    return (
      <div className="column-header relative hoverable">
        {!readOnly && <div className="handle-above" />}
        {!readOnly && (
          <DeleteButton
            resourceName="column"
            onClick={() => deleteGroup(group.id)}
            className="above"
          />
        )}
        <Input
          rowKey={0}
          maxLength={16}
          placeholder="x"
          defaultValue={group.name}
          handleChange={this.handleChange}
          {...this.props}
        />
      </div>
    );
  }
}

ColumnLabel.propTypes = {
  readOnly: PropTypes.bool,
  group: PropTypes.object,
  deleteGroup: PropTypes.func,
  updateMeasurements: PropTypes.func,
};

export default SortableElement(ColumnLabel);
