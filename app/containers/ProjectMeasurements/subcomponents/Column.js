import React, { PropTypes } from 'react';
import ColHeader from './ColHeader';
import ColField from './ColField';

export default function Column({ grouping }) {
  const { constraint, items } = grouping;
  let header = <div className="column-header">Description</div>;
  if (constraint) {
    header = <ColHeader {...{ constraint }} />;
  }
  return (
    <div className="column">
      {header}
      {items.map((item) => {
        const itemKey = `${item.type}[${item.index}]`;
        return (
          <div key={itemKey}>
            <ColField
              name={`${itemKey}.value`}
              maxLength={item.fieldLength || 5}
            />
          </div>
        );
      })}
    </div>
  );
}

Column.propTypes = {
  grouping: PropTypes.object,
};
