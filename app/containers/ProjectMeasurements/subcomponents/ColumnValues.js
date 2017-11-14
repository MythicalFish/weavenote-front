import React, { PropTypes } from 'react';
import ColumnValue from './ColumnValue';

class ColumnValues extends React.PureComponent {
  render() {
    const { measurements, colWidths } = this.props;
    return (
      <div className="flex y-fill">
        {measurements.groups.map((group, colKey) => (
          <ColumnValue
            {...{
              colKey,
              colWidth: colWidths[colKey],
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
  colWidths: PropTypes.object,
  measurements: PropTypes.object,
};

export default ColumnValues;
