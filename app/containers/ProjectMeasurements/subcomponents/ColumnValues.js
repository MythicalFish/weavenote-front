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
      <div>
        <div className="flex y-fill">
          {measurements.groups.map((group, i) => (
            <ColumnValue
              {...{
                colKey: i + 1,
                colWidth: colWidths[i + 1] ? colWidths[i + 1].max : 0,
                key: `groups[${group.id}].name`,
                group,
                ...this.props,
              }}
            />
          ))}
          <div style={{ width: '10px', flex: 'none' }} />
        </div>
        <div style={{ height: '10px' }} />
      </div>
    );
  }
}

ColumnValues.propTypes = {
  maxHeight: PropTypes.number,
  colWidths: PropTypes.array,
  measurements: PropTypes.object,
  size: PropTypes.object,
  setHeight: PropTypes.func,
};

export default sizeMe({ monitorHeight: true })(ColumnValues);
