import React, { PropTypes } from 'react';
import ColumnValue from './ColumnValue';

class ColumnValues extends React.PureComponent {
  componentDidMount() {
    this.ref.addEventListener('scroll', (e) =>
      this.props.doScroll(e.target.scrollTop)
    );
  }
  render() {
    const { measurements, colWidths } = this.props;
    return (
      <div className="flex-auto scroll-y" ref={(ref) => (this.ref = ref)}>
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
      </div>
    );
  }
}

ColumnValues.propTypes = {
  colWidths: PropTypes.object,
  measurements: PropTypes.object,
  doScroll: PropTypes.func,
};

export default ColumnValues;
