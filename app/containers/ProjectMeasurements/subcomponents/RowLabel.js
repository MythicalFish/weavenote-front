import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';

const Handle = (props) => <div className="handle-left" {...props} />;

class RowLabel extends React.PureComponent {
  state = { active: false };
  render() {
    const {
      name,
      updateMeasurements,
      deleteName,
      readOnly,
      colWidth,
    } = this.props;
    const handleChange = (value) => {
      updateMeasurements({ names: [Object.assign(name, { value })] });
    };
    return (
      <div className="column-cell hoverable relative">
        {this.state.active && <div className="row-highlight" />}
        {!readOnly && <Handle />}
        {!readOnly && (
          <DeleteButton
            resourceName="row"
            onClick={() => deleteName(name.id)}
            className="left-of"
          />
        )}
        <div className="flex">
          <label className="identifier flex-none">{name.identifier}</label>
          <Input
            colWidth={colWidth}
            handleChange={handleChange}
            defaultValue={name.value}
            maxLength={25}
            placeholder="Untitled"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

RowLabel.propTypes = {
  readOnly: PropTypes.bool,
  name: PropTypes.object,
  updateMeasurements: PropTypes.func,
  deleteName: PropTypes.func,
};

export default SortableElement(RowLabel);
