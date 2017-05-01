import React from 'react';
import { TextInput } from '../Input';

function DataRow(p) {
  let { label, type } = p;
  if (!label) { label = p.name; }
  if (!type) { type = 'text'; }
  return (
    <div>
      <label htmlFor={p.name}>{label}</label>
      {type === 'text' &&
        <TextInput name={p.name} val={p.val} />
      }
    </div>
  );
}

DataRow.propTypes = {
  name: React.PropTypes.string,
  val: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default DataRow;
