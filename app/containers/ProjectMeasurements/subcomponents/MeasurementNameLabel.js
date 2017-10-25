import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteButton from './DeleteButton';
import Input from './Input';
import { toggleState } from 'utils/misc';

const Handle = (props) => <div className="handle-left" {...props} />;

class MeasurementNameLabel extends React.PureComponent {
  state = { active: false };
  render() {
    const { name, updateMeasurements, deleteName } = this.props;
    const handleChange = (value) => {
      updateMeasurements({ names: [Object.assign(name, { value })] });
    };
    return (
      <div className="column-cell hoverable relative">
        {this.state.active && <div className="row-highlight" />}
        <Handle
          onMouseDown={() => toggleState(this, 'active')}
          onMouseUp={() => toggleState(this, 'active')}
        />
        <DeleteButton
          resourceName="row"
          onClick={() => deleteName(name.id)}
          className="left-of"
        />
        <div className="flex">
          <label className="identifier flex-none">{name.identifier}</label>
          <Input
            handleChange={handleChange}
            defaultValue={name.value}
            maxLength={25}
            placeholder="Untitled"
          />
        </div>
      </div>
    );
  }
}

MeasurementNameLabel.propTypes = {
  name: PropTypes.object,
  updateMeasurements: PropTypes.func,
  deleteName: PropTypes.func,
};

export default SortableElement(MeasurementNameLabel);
