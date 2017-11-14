import React, { PropTypes } from 'react';
import ColumnValue from './ColumnValue';

class ColumnValues extends React.PureComponent {
  render() {
    const { measurements } = this.props;
    return (
      <div className="flex y-fill">
        {measurements.groups.map((group) => (
          <ColumnValue
            {...{
              key: `groups[${group.id}].name`,
              group,
              ...this.props,
            }}
          />
        ))}
      </div>
    );
  }
}

ColumnValues.propTypes = {
  measurements: PropTypes.object,
};

export default ColumnValues;
