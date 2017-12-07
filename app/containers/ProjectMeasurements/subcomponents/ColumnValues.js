import React, { PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import ColumnValue from './ColumnValue';

class ColumnValues extends React.PureComponent {
  componentDidUpdate() {
    const { setHeight, size: { height }, maxHeight } = this.props;
    if (height > 0 && height !== maxHeight) setHeight(height + 42);
  }
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
  maxHeight: PropTypes.number,
  colWidths: PropTypes.object,
  measurements: PropTypes.object,
  size: PropTypes.object,
  setHeight: PropTypes.func,
};

export default sizeMe({ monitorHeight: true })(ColumnValues);
